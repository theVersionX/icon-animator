import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AnimatedIconGenerator } from '../../shared/classes/animated-icon-generator';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {

  //injections
  private sanitizer: DomSanitizer = inject(DomSanitizer);


  trustedResultSVG: SafeHtml = this.sanitizer.bypassSecurityTrustHtml('')

  private animatedIconGenerator: AnimatedIconGenerator = new AnimatedIconGenerator(
    'location',
    3,
  )

  constructor() {
    this.generateAnimatedIcon();
  }

  protected generateAnimatedIcon(): void {
    this.animatedIconGenerator.generateAnimatedIcon([0, 50, 100]).then((trustedResultSVG) => {
      this.trustedResultSVG = trustedResultSVG
    });
  }




}
