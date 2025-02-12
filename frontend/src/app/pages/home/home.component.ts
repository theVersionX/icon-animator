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


  trustedResultSVG: SafeHtml = new AnimatedIconGenerator().generateAnimatedIcon();



}
