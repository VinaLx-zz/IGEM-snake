/// <reference path="./button.ts" />
/// <reference path="./snake.ts" />

abstract class DirectionControl extends HoldButton<Bound> {
    constructor(
        center: Vector, b: Bound) {
        super(
            pos => this.DirectionChange(
                V.Minus(pos, this.center).Direction(), pos),
            () => this.ResetDirection(), b);
        this.center = center;
    }
    abstract DirectionChange(direction: Vector, pos: Vector): void;
    abstract ResetDirection(): void;
    center: Vector;
}

class Rocker extends DirectionControl {
    constructor(
        center: Vector, b: Bound, circle: CircleBound,
        onChange: (dir: Vector) => void) {
        super(center, b);
        this.dot = this.center;
        this.circle = circle;
        this.change = onChange;
    }
    DirectionChange(direction: Vector, pos: Vector) {
        this.change(direction);
        this.dot = this.circle.Adjust(pos);
    }
    ResetDirection(): void {
        this.dot = this.center;
    }
    dot: Vector;
    circle: CircleBound;
    change: (dir: Vector) => void;
}
