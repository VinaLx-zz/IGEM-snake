/// <reference path="./vector.ts" />
class Rectangle {
    constructor(topLeft: Vector, botRight: Vector) {
        this.topLeft = topLeft;
        this.botRight = botRight;
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