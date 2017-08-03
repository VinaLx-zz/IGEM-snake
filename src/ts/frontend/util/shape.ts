/// <reference path="./vector.ts" />
/// <reference path="./interfaces.ts" />

interface RectangleLike extends Positioned, Sized { }

class Rectangle implements RectangleLike {
    constructor(x: number, y: number, w: number, h: number) {
        this.topLeft = new Vector(x, y);
        this.width = w;
        this.height = h;
    }
    X(): number { return this.minX; }
    Y(): number { return this.minY; }
    Width(): number { return this.maxX - this.minX; }
    Height(): number { return this.maxY - this.minY; }
    Position(): Vector { return this.topLeft; }
    Center(): Vector {
        return new Vector(
            (this.minX + this.maxX) / 2, (this.minY + this.maxY) / 2)
        }

    get minX(): number {
        return this.topLeft.X;
    }
    get maxX(): number {
        return this.minX + this.width;
    }
    get minY(): number {
        return this.topLeft.Y;
    }
    get maxY(): number {
        return this.minY + this.height;
    }
    topLeft: Vector;
    width: number;
    height: number;
}

interface CircleLike extends Positioned, Sized {
    Origin(): Vector;
    R(): number;
}

class Circle implements CircleLike {
    constructor(x: number, y: number, radius: number) {
        this.origin = new Vector(x, y);
        this.radius = radius;
    }
    X(): number { return this.origin.X - this.radius; }
    Y(): number { return this.origin.Y - this.radius; }
    Width(): number { return 2 * this.radius; }
    Height(): number { return 2 * this.radius; }
    Position(): Vector { return new Vector(this.X(), this.Y()); }
    Origin(): Vector {
        return this.origin;
    }
    Center(): Vector { return this.Origin(); }
    R(): number {
        return this.radius;
    }
    origin: Vector;
    radius: number;
}