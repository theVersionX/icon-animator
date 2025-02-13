import { Vector2D } from "../../../../../shared/interfaces/vector-2d";

export class Keyframe {

    //consts 
    private readonly r: number = 20;
    private pos: Vector2D = { x: 0, y: 0 };

    constructor() { }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();
    }

    public onDrag(mouseStartPos: Vector2D, mouseEndPos: Vector2D): void {
        console.log("Now");
        if (this.getDist(this.pos, mouseEndPos) < this.r) {
            this.pos={...mouseEndPos}
        }
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
}