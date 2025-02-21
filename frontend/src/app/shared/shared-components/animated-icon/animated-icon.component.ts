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
  protected readonly animationDurationPlaceholderSuffix: string = 'AnimationDurationPlaceholder'

  //data
  protected trustedIcon = computed<WritableSignal<AnimatedIconDefinition>>(() => {
    const trustedIcon: AnimatedIconDefinition = {
      ...this.icon(),
      icon: this.sanitizer.bypassSecurityTrustHtml(this.icon().icon as string)
    }
    return signal<AnimatedIconDefinition>(trustedIcon)
  });

  //flags
  private animationFinished: boolean = true;


  public triggerAnimation(): void {
    if (this.triggerOnClick() && this.animationFinished) {
      let newIcon: string = this.icon().icon as string;

      newIcon = this.replaceString(newIcon, this.animationDurationPlaceholderSuffix, `${this.animationDuration()}s`)
      this.trustedIcon().update((state) => ({ ...state, icon: this.sanitizer.bypassSecurityTrustHtml(newIcon) }));

      this.animationFinished = false;
      setTimeout(() => {
        this.animationFinished = true;
      }, this.animationDuration() * 1000);
    }
  }

  private replaceString(input: string, search: string, replacement: string): string {
    const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"); // Escape special regex characters
    return input.replace(regex, replacement);
  }

}
