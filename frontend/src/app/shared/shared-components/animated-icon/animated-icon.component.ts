import { Component, computed, inject, input, model, Signal, signal, WritableSignal } from '@angular/core';
import { AnimatedIconDefinition } from '../../interfaces/animated-icon-definition';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-animated-icon',
  templateUrl: './animated-icon.component.html',
  styleUrl: './animated-icon.component.less',
  imports: [],
})
export class AnimatedIconComponent {
  //inputs
  icon = input.required<AnimatedIconDefinition>();
  animationDuration = input<number>(1);
  triggerOnClick = input<boolean>(true);

  //injections
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);

  //consts
  protected readonly animationSuffix: string = 'Animation'
  protected readonly animationPlaceholderSuffix: string = 'AnimationPlaceholder'
  protected readonly iconId: string = this.getRandomString(10);

  //data
  protected trustedIcon = computed<WritableSignal<AnimatedIconDefinition>>(() => {
    const trustedIcon: AnimatedIconDefinition = {
      ...this.icon(),
      icon: this.sanitizer.bypassSecurityTrustHtml(this.getIconWithUniqueAnimationName(this.icon().icon as string))
    }
    console.log(this.iconId);
    return signal<AnimatedIconDefinition>(trustedIcon)
  });

  //flags
  private animationFinished: boolean = true;


  public triggerAnimation(): void {
    if (this.triggerOnClick() && this.animationFinished) {
      console.log("now", this.iconId);
      let newIcon: string = JSON.parse(JSON.stringify(this.icon().icon));
      this.trustedIcon()().shapeIds.forEach((shapeId) => {
        const animation = `${shapeId}${this.animationSuffix}${this.iconId} ${this.animationDuration()}s` //creating new animation
        newIcon = newIcon.replace(`${shapeId}${this.animationPlaceholderSuffix}`, animation)
      });
      this.trustedIcon().update((state) => ({ ...state, icon: this.sanitizer.bypassSecurityTrustHtml(this.getIconWithUniqueAnimationName(newIcon)) }));

      this.animationFinished = false;
      setTimeout(() => {
        this.animationFinished = true;
      }, this.animationDuration() * 1000);
    }
  }


  private getIconWithUniqueAnimationName(icon: string): string {
    let iconWithUniqueAnimationName: string = JSON.parse(JSON.stringify(icon));
    this.icon().shapeIds.forEach((shapeId) => {
      //make animationName unique
      iconWithUniqueAnimationName = this.replaceString(iconWithUniqueAnimationName, `@keyframes ${shapeId}${this.animationSuffix}`, `@keyframes ${shapeId}${this.animationSuffix}${this.iconId}`);
      //make className unique
      iconWithUniqueAnimationName = this.replaceString(iconWithUniqueAnimationName, `class="${shapeId}"`, `class="${shapeId}${this.iconId}"`)
      //update css style with unique class names
      iconWithUniqueAnimationName = this.replaceString(iconWithUniqueAnimationName, `.${shapeId}`, `.${shapeId}${this.iconId}`)
    });
    return iconWithUniqueAnimationName
  }

  private replaceString(input: string, search: string, replacement: string): string {
    const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"); // Escape special regex characters
    return input.replace(regex, replacement);
  }

  getRandomString(n: number): string {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";

    for (let i = 0; i < n; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
  }


}
