/// <reference path="../../util/function.ts" />
/// <reference path="../../util/interfaces.ts" />

class Painter {
    constructor(f: (ctx: CanvasRenderingContext2D, time: number) => void) {
        this.Paint = f;
    }
    Paint: (ctx: CanvasRenderingContext2D, time: number) => void;
    Pure(): Painter {
        return new Painter((ctx, time) => {
            ctx.save();
            this.Paint(ctx, time);
            ctx.restore();
        });
    }
    Then(p: Painter): Painter {
        return new Painter((ctx, time) => {
            this.Paint(ctx, time);
            p.Paint(ctx, time);
        })
    }
    Translate(x: number, y: number): Painter {
        return new Painter((ctx, time) => {
            ctx.translate(x, y);
            this.Paint(ctx, time);
        }).Pure();
    }
    ClipRect(x: number, y: number, w: number, h: number): Painter {
        return new Painter((ctx, time) => {
            ctx.rect(x, y, w, h);
            ctx.clip();
            this.Paint(ctx, time);
        }).Pure();
    }
    Scale(x: number, y: number): Painter {
        return new Painter((ctx, time) => {
            ctx.scale(x, y);
            this.Paint(ctx, time);
        }).Pure();
    }
    Rotate(pos: Vector, deg: number): Painter {
        return new Painter((ctx, time) => {
            ctx.rotate(deg);
            this.Paint(ctx, time);
        }).Translate(pos.X, pos.Y);
    }
}

namespace Paint {
    export function Noop(): Painter {
        return new Painter(Func.Noop);
    }
    export function If(
        b: () => Boolean, ifTrue: Painter, ifFalse: Painter): Painter {
        return Delay(() => {
            if (b()) return ifTrue;
            return ifFalse;
        });
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
    export function CirclePicture(
        img: HTMLImageElement, ox: number, oy: number, r: number): Painter {
        return Picture(img, ox - r, oy - r , 2 * r, 2 * r);
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
    export function ArcStroke(
        color: string, x: number, y: number,
        r: number, beg: number, end: number, lineWidth: number = 1): Painter {
        return new Painter(ctx => {
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, r, beg, end);
            ctx.stroke();
        });
    }
    export function CircleStroke(
        color: string, x: number, y: number, r: number, lineWidth: number = 1) {
        return ArcStroke(color, x, y, r, 0, 2 * Math.PI, lineWidth);
    }
    export function PositionedImage(
        a: Positioned & Sized, img: HTMLImageElement) {
        return Picture(img, a.X(), a.Y(), a.Width(), a.Height());
    }
    export function RepositionedImage(
        a: Positioned & Sized,
        f: (v: Vector) => Vector, img: HTMLImageElement) {
        const pos = f(new Vector(a.X(), a.Y()));
        return Picture(img, pos.X, pos.Y, a.Width(), a.Height());
    }
    export function Text(
        font: string, text: string, x: number, y: number,
        color: string = "black", baseline: string = "top") {
        return new Painter(ctx => {
            ctx.textBaseline = baseline;
            ctx.font = font;
            ctx.fillStyle = color;
            ctx.fillText(text, x, y);
        })
    }
    export function Background(img: HTMLImageElement): Painter {
        return Picture(img, 0, 0, 1, SZ.HEIGHT_FACTOR / SZ.WIDTH_FACTOR);
    }
    export function BackgroundColor(color: string): Painter {
        return Rect(color, 0, 0, 1, SZ.HEIGHT_FACTOR / SZ.WIDTH_FACTOR);
    }
}