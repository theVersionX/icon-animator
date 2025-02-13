import { Component, computed, inject, input, model, signal } from '@angular/core';
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
  icon = model.required<AnimatedIconDefinition>();
  animationDuration = input<number>(1);
  triggerOnClick = input<boolean>(true);

  //injections
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);

  //consts
  protected readonly animationSuffix: string = 'Animation'
  protected readonly animationPlaceholderSuffix: string = 'AnimationPlaceholder'

  //data
  protected trustedIcon = computed<AnimatedIconDefinition>(() => {
    const trustedIcon: AnimatedIconDefinition = { ...this.icon(), icon: this.sanitizer.bypassSecurityTrustHtml(this.icon().icon as string) }
    return trustedIcon
  });

  //flags
  private animationFinished: boolean = true;

  public triggerAnimation(): void {
    if (this.triggerOnClick() && this.animationFinished) {
      let newIcon: string = this.icon().icon as string;
      this.trustedIcon().shapeIds.forEach((shapeId) => {
        const animation = `${shapeId}${this.animationSuffix} ${this.animationDuration()}s`
        newIcon = newIcon.replace(`${shapeId}${this.animationPlaceholderSuffix}`, animation)
      });
      this.icon.update((state) => ({ ...state, icon: newIcon }));

      this.animationFinished = false;
      setTimeout(() => {
        this.animationFinished = true;
      }, this.animationDuration() * 1000);
    }
  }

}
