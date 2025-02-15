import { Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AnimatedIconGenerator } from '../../shared/classes/animated-icon-generator';
import { AnimatedIconDefinition } from '../../shared/interfaces/animated-icon-definition';
import { AnimatedIconComponent } from '../../shared/shared-components/animated-icon/animated-icon.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { CommonModule } from '@angular/common';
import { saveFile } from '../../shared/helpers/file.helper';
import { LOCATION_ANIMATED_ICON_DEFINITION } from '../../../../public/svgs/animated-icons/icon-definitions/location';
import { RECTANGLE_ANIMATED_ICON_DEFINITION } from '../../../../public/svgs/animated-icons/icon-definitions/rectangle';

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
  protected readonly baseFileName: string = 'rectangle';
  protected readonly keyframeCount: number = 2;
  protected readonly firstFrameIsLastFrame: boolean = true;
  //----------------------------------------------------

  //consts
  protected readonly locationIcon: AnimatedIconDefinition = LOCATION_ANIMATED_ICON_DEFINITION;
  protected readonly rectangleIcon: AnimatedIconDefinition = RECTANGLE_ANIMATED_ICON_DEFINITION;

  //data
  protected testIcon = signal<AnimatedIconDefinition>({ icon: "", shapeIds: [] });
  protected generatedAnimatedIconDefinition!: AnimatedIconDefinition;

  private animatedIconGenerator: AnimatedIconGenerator = new AnimatedIconGenerator(
    this.baseFileName,
    this.keyframeCount,
    this.firstFrameIsLastFrame,
  )

  constructor() { }

  protected generateAnimatedIcon(keyframes: number[]): void {
    this.animatedIconGenerator.generateAnimatedIcon(keyframes).then((animatedIconDefinition: AnimatedIconDefinition) => {
      this.generatedAnimatedIconDefinition = animatedIconDefinition
      this.testIcon.set(JSON.parse(JSON.stringify(animatedIconDefinition)));
      //console.log(animatedIconDefinition.icon);
    });
  }

  protected saveAnimatedIcon(): void {
    if (this.generatedAnimatedIconDefinition) {
      saveFile(this.generatedAnimatedIconDefinition, this.baseFileName);
    }
  }

  protected onKeyframesUpdated(keyfames: number[]): void {
    this.generateAnimatedIcon(keyfames);
  }




}
