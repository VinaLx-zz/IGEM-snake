/// <reference path="../../util/bound.ts" />
/// <reference path="./painter.ts" />

// interface Movable extends Positioned {
//     Move(b: AdjustableBound): void;
// }

// interface Snake extends Movable {
//     Grow(b: AdjustableBound): void;
//     Shrink(): void;
//     Head(): Vector;
//     Tail(): Vector;
//     Length(): number;
// }

// class Nematode implements Snake {
//     constructor(x: number, y: number) {
//         // this.body = new std.Deque([new Vector(x, y)]);
//     }

//     Move(b: AdjustableBound): void {
//         const p = this.SpeedPoint();
//         for (let i = 0; i < p; ++i) {
//             const newHead = this.Head().TowardDirection(
//                 this.direction, param.DIST_BETWEEN_POINTS);
//             this.body.push_front(b.Adjust(newHead));
//             this.body.pop_back();
//         }
//     }
//     Grow(b: AdjustableBound): void {
//         let p = param.POINTS_BETWEEN_BODY;
//         const d = this.direction.Neg();
//         for (let i = 0; i < param.POINTS_BETWEEN_BODY; ++i)
//             this.body.push_back(b.Adjust(
//                 this.Tail().TowardDirection(d, param.DIST_BETWEEN_POINTS)));
//     }
//     Shrink(): void {
//         if (this.Length() == 1) return;
//         for (let i = 0; i < param.POINTS_BETWEEN_BODY; ++i) {
//             this.body.pop_back();
//         }
//     }
//     Head(): Vector {
//         return this.body.at(0);
//     }
//     Tail(): Vector {
//         return this.body.back();
//     }
//     Length(): number {
//         return 1 + (this.body.size() - 1) / param.POINTS_BETWEEN_BODY;
//     }
//     Paint(): Painter {
//         // TODO
//         return Paint.Noop();
//     }

//     private SpeedPoint(): number {
//         if (this.accelerating)
//             return param.SNAKE_ACCELERATED_SPEED;
//         return param.SNAKE_NORMAL_SPEED;
//     }

//     X(): number { return this.Head().X; }
//     Y(): number { return this.Head().Y; }
//     Position(): Vector { return this.Head(); }

//     // body: std.Deque<Vector>;
//     accelerating: Boolean = false;
//     direction: Vector = new Vector(0, -1); // default upward
// }