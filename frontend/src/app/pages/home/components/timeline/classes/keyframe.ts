import { Vector2D } from "../../../../../shared/interfaces/vector-2d";

export class Keyframe {

    //consts 
    private readonly grabRadius: number = 20;

    //data
    private ind: number = 0;
    private pos: Vector2D = { x: 0, y: 0 };
    private isGrabbed: boolean = false;

    constructor(ind: number) {
        this.ind = ind;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = '#444';
        ctx.fill();

        ctx.font = '10px Aria';
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = '#fff'
        ctx.fillText(`${this.ind}`, this.pos.x, this.pos.y);
    }

    public onDrag(siblings: Keyframe[], mousePos: Vector2D, timelineStartPos: Vector2D, timelineWidth: number, updatedCallback: () => void): void {

        if (this.getDist(this.pos, mousePos) < this.grabRadius) {
            if (siblings.filter(s => s.getIsGrabbed()).length === 0) {
                this.isGrabbed = true;
            }
        }
        if (this.isGrabbed) {
            if (mousePos.x >= timelineStartPos.x && mousePos.x <= timelineStartPos.x + timelineWidth) {
                const prevInd: number = this.ind - 1;
                const nextInd: number = this.ind + 1;
                this.pos.x = mousePos.x

                if (prevInd >= 0) {
                    if (this.getDist(this.pos, siblings[prevInd].getPos()) < this.grabRadius * 2) {
                        this.pos.x = siblings[prevInd].getPos().x + this.grabRadius * 2
                    }
                }
                if (nextInd < siblings.length) {
                    if (this.getDist(this.pos, siblings[nextInd].getPos()) < this.grabRadius * 2) {
                        this.pos.x = siblings[nextInd].getPos().x - this.grabRadius * 2
                    }
                }
                updatedCallback();
            }
        }
    }

    onDragEnd(): void {
        this.isGrabbed = false;
    }


    private getDist(p1: Vector2D, p2: Vector2D): number {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }


    public setPos(newPos: Vector2D): void {
        this.pos = { ...newPos }
    }

    public getPos(): Vector2D {
        return { ...this.pos }
    }

    public getIsGrabbed(): boolean {
        return this.isGrabbed;
    }
}