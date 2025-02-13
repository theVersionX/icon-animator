import { Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AnimatedIconGenerator } from '../../shared/classes/animated-icon-generator';
import { LOCATION_ICON_DEFINITION } from '../../../../public/svgs/animated-icons/icon-definitions/location';
import { AnimatedIconDefinition } from '../../shared/interfaces/animated-icon-definition';
import { AnimatedIconComponent } from '../../shared/shared-components/animated-icon/animated-icon.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',

  imports: [
    AnimatedIconComponent
  ],

})
export class HomeComponent {
  //Edit here ------------------------------------------
  protected readonly baseFileName: string = 'location';
  protected readonly frameCount: number = 3;
  //----------------------------------------------------


  //injections
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);

  //consts
  protected readonly locationIcon: AnimatedIconDefinition = LOCATION_ICON_DEFINITION;


  //data
  protected testIcon = signal<AnimatedIconDefinition>(LOCATION_ICON_DEFINITION);

  private animatedIconGenerator: AnimatedIconGenerator = new AnimatedIconGenerator(
    this.baseFileName,
    this.frameCount,
  )

  constructor() {
    this.generateAnimatedIcon(); //todo uncomment to generate icon
  }

  protected generateAnimatedIcon(): void {
    this.animatedIconGenerator.generateAnimatedIcon([0, 50, 100]).then((animatedIconDefinition: AnimatedIconDefinition) => {
      this.testIcon.set(animatedIconDefinition);
      console.log(animatedIconDefinition.icon);
    });
  }




}
