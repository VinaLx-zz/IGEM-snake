/// <reference path="./button.ts" />

class CircleButton extends ClickButton {
    constructor(
        x: number, y: number, r: number, img: HTMLImageElement,
        onClick: MouseEventCallback) {
        super(onClick, new CircleBound(x, y, r));
        this.img = img;
    }
    Paint(): Painter {
        const ox = this.bound.origin.X, oy = this.bound.origin.Y;
        const r = this.bound.radius;
        return Paint.Picture(this.img, ox - r, oy - r, 2 * r, 2 * r);
    }
    img: HTMLImageElement;
    bound: CircleBound;
}
