import { Component, signal } from '@angular/core';
import { AnimatedIconGenerator } from '../../shared/classes/animated-icon-generator';
import { AnimatedIconDefinition } from '../../shared/interfaces/animated-icon-definition';
import { AnimatedIconComponent } from '../../shared/shared-components/animated-icon/animated-icon.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { CommonModule } from '@angular/common';
import { saveFile } from '../../shared/helpers/file.helper';

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
  protected readonly baseFileName: string = 'jamingo-logo';
  protected readonly keyframeCount: number = 6;
  protected readonly firstFrameIsLastFrame: boolean = true;
  protected readonly animationDuration: number = 1;
  //----------------------------------------------------

  //data
  protected testIcon = signal<AnimatedIconDefinition>({ icon: "" });
  protected generatedAnimatedIconDefinition!: AnimatedIconDefinition;

  private animatedIconGenerator: AnimatedIconGenerator = new AnimatedIconGenerator(
    this.baseFileName,
    this.keyframeCount,
    this.firstFrameIsLastFrame,
  )

  constructor() {
  }

  protected generateAnimatedIcon(keyframes: number[]): void {
    console.log(keyframes);
    this.animatedIconGenerator.generateAnimatedIcon(keyframes).then((animatedIconDefinition: AnimatedIconDefinition) => {
      this.generatedAnimatedIconDefinition = animatedIconDefinition
      this.testIcon.set(JSON.parse(JSON.stringify(animatedIconDefinition)));
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
