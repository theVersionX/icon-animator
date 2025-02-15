import { AfterViewChecked, Component, ElementRef, HostListener, input, output, signal, ViewChild } from '@angular/core';
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
  keyframesUpdatedEvent = output<number[]>();

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
  private mappedEndPos: Vector2D = { x: 0, y: 0 };
  private timelineStartPos: Vector2D = { x: 0, y: 0 };
  private timelineWidth: number = 0;
  //flags
  private inited = signal<boolean>(false);
  private dragStarted: boolean = false;



  private calcMappedDragPos(pos: Vector2D): void {
    const canvasPos: Vector2D = {
      x: this.canvas?.nativeElement.getBoundingClientRect().left,
      y: this.canvas?.nativeElement.getBoundingClientRect().top
    };

    this.mappedEndPos = {
      x: pos.x - canvasPos.x,
      y: pos.y - canvasPos.y,
    };
    this.render(this.ctx);
  }

  ngAfterViewChecked(): void {
    if (this.canvas && !this.inited() && this.canvas.nativeElement.getBoundingClientRect().width !== 0) {
      this.ctx = this.canvas.nativeElement.getContext('2d');
      this.resize();

      this.timelineWidth = (this.canvasSize.x - this.margin * 2);
      this.timelineStartPos = {
        x: this.margin,
        y: this.canvasSize.y / 2,
      }
      for (let i = 0; i < this.keyframeCount(); i++) {
        this.keyframes.push(new Keyframe(i));
        this.keyframes.at(this.keyframes.length - 1)?.setPos({ x: this.timelineStartPos.x + (this.timelineWidth / (this.keyframeCount() - 1)) * i, y: this.timelineStartPos.y });
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
          keyframe.onDrag(this.keyframes, this.mappedEndPos, this.timelineStartPos, this.timelineWidth, () => { });
        }
        keyframe.render(ctx);
      });
    }
  }

  private calculateKeyframePercentages(): void {
    let percentages: number[] = [];
    this.keyframes.forEach((keyframe) => {
      percentages.push(((keyframe.getPos().x - this.timelineStartPos.x) / this.timelineWidth) * 100);
    });
    this.keyframesUpdatedEvent.emit(percentages);
  }

  //mouse events
  @HostListener(USER_EVENTS.mouseDown, ['$event'])
  onMouseDown(event: MouseEvent) {
    this.startPos = {
      x: event.clientX,
      y: event.clientY,
    }
    this.dragStarted = true
    this.calcMappedDragPos(this.endPos);
  }
  @HostListener(USER_EVENTS.mouseUp, ['$event'])
  onMouseUp(event: MouseEvent) {
    this.endPos = {
      x: event.clientX,
      y: event.clientY,
    }
    this.dragStarted = false
    this.keyframes.forEach((keyframe) => {
      keyframe.onDragEnd();
    });
    this.calcMappedDragPos(this.endPos);
    this.calculateKeyframePercentages();
  }
  @HostListener(USER_EVENTS.mouseMove, ['$event'])
  @HostListener(USER_EVENTS.touchMove, ['$event'])
  onMouseMove(event: MouseEvent) {
    this.endPos = {
      x: event.clientX,
      y: event.clientY,
    }
    this.calcMappedDragPos(this.endPos)

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
