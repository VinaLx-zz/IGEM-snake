/// <reference path="./vector.ts"/>
/// <reference path="./shape.ts" />
/// <reference path="./function.ts" />

interface Bound {
    Contains(pos: Vector): Boolean;
}

interface AdjustableBound extends Bound {
    Adjust(pos: Vector): Vector;
}

class RectBound extends Rectangle implements AdjustableBound {
    constructor(x: number, y: number, w: number, h: number) {
        super(x, y, w, h);
    }
    Left(): number { return this.minX; }
    Right(): number { return this.maxX; }
    Up(): number { return this.minY; }
    Down(): number { return this.maxY; }

    Contains(pos: Vector): Boolean {
        return pos.X >= this.minX &&
            pos.Y >= this.minY &&
            pos.X <= this.maxX &&
            pos.Y <= this.maxY;
    }
    Adjust(pos: Vector): Vector {
        return pos.Alter(x => {
            if (x < this.minX) return this.minX;
            if (x > this.maxX) return this.maxX;
            return x;
        }, y => {
            if (y < this.minY) return this.minY;
            if (y > this.maxY) return this.maxY;
            return y;
        })
    }
}

class CircleBound extends Circle implements AdjustableBound {
    constructor(x: number, y: number, radius: number) {
        super(x, y, radius);
    }
    Contains(pos: Vector): Boolean {
        return V.Distance(pos, this.origin) <= this.radius;
    }
    Adjust(pos: Vector): Vector {
        if (this.Contains(pos)) {
            return pos;
        }
        const d: Vector = V.Minus(pos, this.origin);
        return V.Add(
            this.origin,
            d.Mult(this.radius / V.Distance(this.origin, pos)));
    }
}

class CircularRectBound extends RectBound {
    constructor(x: number, y: number, w: number, h: number) {
        super(x, y, w, h);
    }
    Adjust(pos: Vector): Vector {
        return pos.Alter(x => {
            const width = this.Width();
            if (x < this.minX)
                return this.maxX - (this.minX - x) % width;
            if (x > this.maxX)
                return this.minX + (x - this.maxX) % width;
            return x;
        }, y => {
            const height = this.Height();
            if (y < this.minY)
                return this.maxY - (this.minY - y) % height;
            if (y > this.maxY) {
                return this.minY + (y - this.maxY) % height;
            }
            return y;
        })
    }
}

namespace Bound {
    // bound arithmetic
    export function Intersect(b1: CircleBound, b2: CircleBound): Boolean {
        return V.Distance(b1.origin, b2.origin) < b1.radius + b2.radius;
    }
    export function AddTwo(lhs: Bound, rhs: Bound): Bound {
        return {
            Contains: (pos: Vector) => lhs.Contains(pos) || rhs.Contains(pos)
        }
    }
    export function Add(b: Bound, ...bs: Bound[]): Bound {
        return Func.foldl(bs, b, AddTwo);
    }

    export function Sub(lhs: Bound, rhs: Bound): Bound {
        return {
            Contains: (pos: Vector) => lhs.Contains(pos) && !rhs.Contains(pos)
        }
    }
}