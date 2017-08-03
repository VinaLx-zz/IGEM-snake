/// <reference path="./button.ts" />

class AnimatedButton<B extends PositionedBound> extends Button<B> {
    constructor(
        bound: B, normal: HTMLImageElement,
        focus: HTMLImageElement, onClick: MouseEventCallback) {
        super(
            bound, onClick,
            () => this.image = focus, () => this.image = normal);
        this.image = normal;
    }
    Painter(): Painter {
        return Paint.Delay(() => Paint.PositionedImage(this.bound, this.image));
    }
    image: HTMLImageElement;
}