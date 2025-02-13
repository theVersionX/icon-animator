import { Component, computed, inject, input } from '@angular/core';
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

  //injections
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);


  protected trustedIcon = computed<AnimatedIconDefinition>(() => {
    const trustedIcon: AnimatedIconDefinition = { ...this.icon(), icon: this.sanitizer.bypassSecurityTrustHtml(this.icon().icon as string) }
    console.log(trustedIcon.icon);
    return trustedIcon
  });



  triggerAnimation(): void {

  }

}
