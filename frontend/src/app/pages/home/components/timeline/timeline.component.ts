import { AfterViewChecked, Component, ElementRef, HostListener, input, signal, ViewChild } from '@angular/core';
import { Vector2D } from '../../../../shared/interfaces/vector-2d';
import { USER_EVENTS } from '../../../../shared/data/user-events';
import { Keyframe } from './classes/keyframe';

@Component({
  selector: 'app-timeline',
  imports: [],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.less'
})
export class TimelineComponent implements AfterViewChecked {
  //inputs & outputs
  keyframeCount = input.required<number>();

  //viewchildren
  @ViewChild('canvas') canvas!: ElementRef;

  //consts
  private readonly margin: number = 20;

  //data
  private canvasSize: Vector2D = { x: 0, y: 0 };
  private keyframes: Keyframe[] = [];
  private ctx!: CanvasRenderingContext2D | null;
  private startPos: Vector2D = { x: 0, y: 0 };
  private endPos: Vector2D = { x: 0, y: 0 };

  //flags
  private inited = signal<boolean>(false);
  private dragStarted: boolean = false;

  ngAfterViewChecked(): void {
    if (this.canvas && !this.inited() && this.canvas.nativeElement.getBoundingClientRect().width !== 0) {
      this.ctx = this.canvas.nativeElement.getContext('2d');
      this.resize();

      for (let i = 0; i < this.keyframeCount(); i++) {
        this.keyframes.push(new Keyframe());
        console.log(i);
        this.keyframes.at(this.keyframes.length-1)?.setPos({ x: ((this.canvasSize.x - this.margin * 2) / this.keyframeCount()) * 2, y: this.canvasSize.y / 2 });
      }

      this.render(this.ctx);
      this.inited.set(true);
    }
  }

  render(ctx: CanvasRenderingContext2D | null): void {
    if (ctx != null) {
      ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

      ctx.beginPath(); // Start a new path
      ctx.moveTo(this.margin, this.canvasSize.y / 2); // Move the pen to (30, 50)
      ctx.lineTo(this.canvasSize.x - this.margin, this.canvasSize.y / 2); // Draw a line to (150, 100)
      ctx.strokeStyle = '#aaaaaa'
      ctx.stroke(); // Render the path

      this.keyframes.forEach((keyframe) => {
        if (this.dragStarted) {
          keyframe.onDrag(this.startPos, this.endPos);
        }
        keyframe.render(ctx);
      });

    }
  }

  //mouse events
  @HostListener(USER_EVENTS.mouseDown, ['$event'])
  onMouseDown(event: MouseEvent) {
    this.startPos = {
      x: event.clientX,
      y: event.clientY,
    }
    this.dragStarted = true
    this.render(this.ctx)
  }
  @HostListener(USER_EVENTS.mouseUp, ['$event'])
  onMouseUp(event: MouseEvent) {
    this.endPos = {
      x: event.clientX,
      y: event.clientY,
    }
    this.dragStarted = false
    this.render(this.ctx)
  }
  @HostListener(USER_EVENTS.mouseMove, ['$event'])
  @HostListener(USER_EVENTS.touchMove, ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.dragStarted) {
      this.endPos = {
        x: event.clientX,
        y: event.clientY,
      }
      this.render(this.ctx);
    }
  }

  private drawDot(x: number, y: number) {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resize();
    this.render(this.ctx);
  }

  resize(): void {
    if (this.ctx != null) {
      this.canvasSize = {
        x: this.canvas.nativeElement.getBoundingClientRect().width,
        y: this.canvas.nativeElement.getBoundingClientRect().height
      }
      this.ctx.canvas.width = this.canvasSize.x;
      this.ctx.canvas.height = this.canvasSize.y;
    }
  }
}
