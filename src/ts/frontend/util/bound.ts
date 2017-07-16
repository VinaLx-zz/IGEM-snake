/// <reference path="./vector.ts"/>
/// <reference path="./shape.ts" />

interface Bound {
    Contains(pos: Vector): Boolean;
}

interface AdjustableBound extends Bound {
    Adjust(pos: Vector): Vector;
}

class RectBound implements AdjustableBound {
    constructor(topLeft: Vector, botRight: Vector) {
        this.r = new Rectangle(topLeft, botRight);
    }
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
    constructor(origin: Vector, radius: number) {
        this.origin = origin;
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
    constructor(topLeft: Vector, botRight: Vector) {
        super(topLeft, botRight);
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
    export function Add(lhs: Bound, rhs: Bound): Bound {
        return {
            Contains: (pos: Vector) => lhs.Contains(pos) || rhs.Contains(pos)
        }
    }
    export function Sub(lhs: Bound, rhs: Bound): Bound {
        return {
            Contains: (pos: Vector) => lhs.Contains(pos) && !rhs.Contains(pos)
        }
    }
}