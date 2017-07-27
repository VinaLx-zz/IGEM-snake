/// <reference path="../../util/bound.ts" />
/// <reference path="./painter.ts" />

interface Movable extends Positioned {
    Move(): void;
}

interface Snake extends Movable {
    Grow(b: AdjustableBound): void;
    Shrink(): void;
    Head(): Vector;
    Tail(): Vector;
    Length(): number;
    direction: Vector;
}

class Nematode implements Snake {
    constructor(
        initPos: Vector, normalSpeed: number, accelerateSpeed: number,
        bound: AdjustableBound, direction: Vector = new Vector(0, -1)) {
        this.body = new Deque([initPos]);
        this.normalSpeed = normalSpeed;
        this.accelerateSpeed = accelerateSpeed;
        this.direction = direction;
        this.bound = bound;
    }

    Move(): void {
        const p = this.SpeedPoint();
        for (let i = 0; i < p; ++i) {
            const newHead = this.Head().TowardDirection(
                this.direction, param.DIST_BETWEEN_POINTS);
            this.body.unshift(this.bound.Adjust(newHead));
            this.body.pop();
        }
    }
    Grow(): void {
        let p = param.POINTS_BETWEEN_BODY;
        const d = this.direction.Neg();
        for (let i = 0; i < param.POINTS_BETWEEN_BODY; ++i)
            this.body.push(this.bound.Adjust(
                this.Tail().TowardDirection(d, param.DIST_BETWEEN_POINTS)));
    }
    Shrink(): void {
        if (this.Length() == 1) return;
        for (let i = 0; i < param.POINTS_BETWEEN_BODY; ++i) {
            this.body.pop();
        }
    }
    Head(): Vector {
        return this.body.peekFront();
    }
    Bodies(): Vector[] {
        let res = [];
        const step = param.POINTS_BETWEEN_BODY;
        for (let i = step; i < this.body.length; i += step) {
            res.push(this.body.get(i));
        }
        return res;
    }
    Tail(): Vector {
        return this.body.peekBack();
    }
    Length(): number {
        return 1 + (this.body.length - 1) / param.POINTS_BETWEEN_BODY;
    }

    static PaintBody(v: Vector): Painter {
        return Paint.CirclePicture(
            IMG.GAME.snakeBody, v.X, v.Y, SZ.GAME.SNAKE_BODY_R);
    }
    PaintHead(v: Vector): Painter {
        let deg = Math.atan(this.direction.Y / this.direction.X);
        if (this.direction.X >= 0) {
            deg = deg + Math.PI;
        }
        return Paint.CirclePicture(
            IMG.GAME.snakeHead, 0, 0, SZ.GAME.SNAKE_HEAD_R)
            .Rotate(v, deg);
    }

    Accelerate(): void {
        this.accelerating = true;
    }
    SlowDown(): void {
        this.accelerating = false;
    }

    private SpeedPoint(): number {
        if (this.accelerating)
            return this.accelerateSpeed;
        return this.normalSpeed;
    }

    X(): number { return this.Head().X; }
    Y(): number { return this.Head().Y; }
    Position(): Vector { return this.Head(); }

    bound: AdjustableBound;
    body: Deque<Vector>;
    accelerating: Boolean = false;
    direction: Vector;
    normalSpeed: number;
    accelerateSpeed: number;
}