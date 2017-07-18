/// <reference path="./button.ts" />

class SlidingBar extends HoldButton<RectBound> {
    constructor(
        init: number, bound: RectBound,
        onChange: (n: number) => void) {
        super((pos: Vector) => {
            this.slider = pos.X;
            onChange(this.progress);
        }, Func.Noop, bound)
        this.slider = init / 100 * bound.Width() + bound.Left();
    }
    get progress(): number {
        return Math.round(
            (this.slider - this.bound.Left()) /
            this.bound.Width() * 100);
    }
    slider: number;
}