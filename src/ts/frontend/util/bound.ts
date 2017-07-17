/// <reference path="./vector.ts"/>
/// <reference path="./shape.ts" />
/// <reference path="./function.ts" />

interface Bound {
    Contains(pos: Vector): Boolean;
}

interface AdjustableBound extends Bound {
    Adjust(pos: Vector): Vector;
}

class RectBound implements AdjustableBound {
    constructor(x: number, y: number, w: number, h: number) {
        this.r = new Rectangle(x, y, w, h);
    }
    Left(): number { return this.r.minX; }
    Right(): number { return this.r.maxX; }
    Up(): number { return this.r.minY; }
    Down(): number { return this.r.maxY; }
    Width(): number { return this.r.Width; }
    Height(): number { return this.r.Height; }

    Contains(pos: Vector): Boolean {
        return pos.X >= this.r.minX &&
            pos.Y >= this.r.minY &&
            pos.X <= this.r.maxX &&
            pos.Y <= this.r.maxY;
    }
    Adjust(pos: Vector): Vector {
        return pos.Alter(x => {
            if (x < this.r.minX) return this.r.minX;
            if (x > this.r.maxX) return this.r.maxX;
            return x;
        }, y => {
            if (y < this.r.minY) return this.r.minY;
            if (y > this.r.maxY) return this.r.maxY;
            return y;
        })
    }
    r: Rectangle;
}

class CircleBound implements AdjustableBound {
    constructor(x: number, y: number, radius: number) {
        this.origin = new Vector(x, y);
        this.radius = radius;
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
    origin: Vector;
    radius: number;
}

class CircularRectBound extends RectBound {
    constructor(x: number, y: number, w: number, h: number) {
        super(x, y, w, h);
    }
    Adjust(pos: Vector): Vector {
        return pos.Alter(x => {
            const width = this.r.Width;
            if (x < this.r.minX)
                return this.r.maxX - (this.r.minX - x) % width;
            if (x > this.r.maxX)
                return this.r.minX + (x - this.r.maxX) % width;
            return x;
        }, y => {
            const height = this.r.Height;
            if (y < this.r.minY)
                return this.r.maxY - (this.r.minY - y) % height;
            if (y > this.r.maxY) {
                return this.r.minY + (y - this.r.maxY) % height;
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