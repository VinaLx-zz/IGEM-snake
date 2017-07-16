/// <reference path="./vector.ts" />
class Rectangle {
    constructor(x: number, y: number, w: number, h: number) {
        this.topLeft = new Vector(x, y);
        this.botRight = new Vector(x + w, y + h);
    }
    get Width(): number {
        return this.maxX - this.minX;
    }
    get Height(): number {
        return this.maxY - this.minY;
    }
    get minX(): number {
        return this.topLeft.X;
    }
    get maxX(): number {
        return this.botRight.X;
    }
    get minY(): number {
        return this.topLeft.Y;
    }
    get maxY(): number {
        return this.botRight.Y;
    }
    topLeft: Vector;
    botRight: Vector;
}

class Circle {
    constructor(origin: Vector, radius: number) {
        this.origin = origin;
        this.radius = radius;
    }
    origin: Vector;
    radius: number;
}