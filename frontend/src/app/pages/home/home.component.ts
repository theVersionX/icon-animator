import { Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AnimatedIconGenerator } from '../../shared/classes/animated-icon-generator';
import { LOCATION_ICON_DEFINITION } from '../../../../public/svgs/animated-icons/icon-definitions/location';
import { AnimatedIconDefinition } from '../../shared/interfaces/animated-icon-definition';
import { AnimatedIconComponent } from '../../shared/shared-components/animated-icon/animated-icon.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',

  imports: [
    CommonModule,
    AnimatedIconComponent,
    TimelineComponent,
  ],

})
export class HomeComponent {
  //Edit here ------------------------------------------
  // if last frame svg isnt provided, the first frame is also used as the last frame -> closed loop
  protected readonly baseFileName: string = 'location';
  protected readonly keyframeCount: number = 2;
  protected readonly firstFrameIsLastFrame: boolean = true;
  //----------------------------------------------------

  //consts
  protected readonly locationIcon: AnimatedIconDefinition = LOCATION_ICON_DEFINITION;


  //data
  protected testIcon = signal<AnimatedIconDefinition>(LOCATION_ICON_DEFINITION);

  private animatedIconGenerator: AnimatedIconGenerator = new AnimatedIconGenerator(
    this.baseFileName,
    this.keyframeCount,
    this.firstFrameIsLastFrame,
  )

  constructor() {
    this.generateAnimatedIcon([0, 50, 100]); //todo uncomment to generate icon
  }

  protected generateAnimatedIcon(keyframes: number[]): void {
    this.animatedIconGenerator.generateAnimatedIcon(keyframes).then((animatedIconDefinition: AnimatedIconDefinition) => {
      this.testIcon.set(animatedIconDefinition);
      //console.log(animatedIconDefinition.icon);
    });
  }

  protected onKeyframesUpdated(keyfames: number[]): void {
    this.generateAnimatedIcon(keyfames);
  }




}
