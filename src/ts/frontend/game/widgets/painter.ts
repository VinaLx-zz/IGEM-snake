/// <reference path="../../util/function.ts" />

class Painter {
    constructor(f: (ctx: CanvasRenderingContext2D, time: number) => void) {
        this.Paint = f;
    }
    Paint: (ctx: CanvasRenderingContext2D, time: number) => void;
    Then(p: Painter): Painter {
        return new Painter((ctx, time) => {
            this.Paint(ctx, time);
            p.Paint(ctx, time);
        })
    }
    Translate(x: number, y: number): Painter {
        return new Painter((ctx, time) => {
            ctx.save();
            ctx.translate(x, y);
            this.Paint(ctx, time);
            ctx.restore();
        });
    }
}

namespace Paint {
    export function Noop(): Painter {
        return new Painter(Func.Noop);
    }
    export function Delay(d: () => Painter) {
        return new Painter((ctx, time) => d().Paint(ctx, time));
    }
    export function Picture(
        img: HTMLImageElement, x: number, y: number, w: number, h: number): Painter {
        return new Painter(ctx => {
            ctx.drawImage(img, x, y, w, h);
        })
    }
    export function Rect(
        color: string, x: number, y: number, w: number, h: number) {
        return new Painter(ctx => {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, w, h);
        })
    }
    export function ArcFill(
        color: string, x: number, y: number,
        r: number, beg: number, end: number): Painter {
        return new Painter(ctx => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, r, beg, end);
            ctx.fill();
        });
    }
    export function Circle(color: string, x: number, y: number, r: number) {
        return ArcFill(color, x, y, r, 0, 2 * Math.PI);
    }
}