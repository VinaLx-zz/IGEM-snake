interface Widget {
    Draw(ctx: CanvasRenderingContext2D): void;
}

interface Destroyable {
    Destroy(): void;
    OnDestroy(callback: () => void): void;
}

interface Positioned {
    position: Vector;
}

interface Mobile extends Positioned {
    Move(b: AdjustableBound): void;
    velocity: number;
    direction: Vector;
}

interface Bounding {
    bound: Bound;
}

// interface Collidable<T> extends Bounding<CircleBound>, Mobile {

// }
