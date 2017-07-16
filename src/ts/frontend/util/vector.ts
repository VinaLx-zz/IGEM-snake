namespace V {
    export function Both(c: number): Vector {
        return new Vector(c, c);
    }
    export function AlterTwo(
        lhs: Vector, rhs: Vector,
        f: (lhs: number, rhs: number) => number): Vector {
        return lhs.Alter(x => f(x, rhs.X), y => f(y, rhs.Y));
    }
    export function Add(lhs: Vector, rhs: Vector): Vector {
        return AlterTwo(lhs, rhs, (a, b) => a + b);
    }
    export function Minus(lhs: Vector, rhs: Vector): Vector {
        return AlterTwo(lhs, rhs, (a, b) => a - b);
    }
    export function Distance(v1: Vector, v2: Vector): number {
        return Minus(v1, v2).Norm();
    }
    export function Clone(v: Vector): Vector {
        const p = v.Pair();
        return new Vector(p[0], p[1]);
    }
}
/**
 * immutable 2D number Vector
 */
class Vector {
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    get X(): number { return this.x; }
    get Y(): number { return this.y; }

    public Pair(): [number, number] {
        return [this.x, this.y];
    }
    public Norm(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    public Direction(): Vector {
        return this.Div(this.Norm());
    }
    public Alter(xf: (x: number) => number, yf: (y: number) => number): Vector {
        return new Vector(xf(this.x), yf(this.y));
    }
    public AlterBoth(f: (n: number) => number): Vector {
        return this.Alter(f, f);
    }
    public Neg(): Vector {
        return this.AlterBoth(n => -n);
    }
    public Add(c: number): Vector {
        return this.AlterBoth(n => n + c);
    }
    public Minus(c: number): Vector {
        return this.AlterBoth(n => n - c);
    }
    public Mult(c: number): Vector {
        return this.AlterBoth(n => n * c);
    }
    public Div(c: number): Vector {
        return this.AlterBoth(n => n / c);
    }
    public ApplyTo<A>(f: (x: number, y: number) => A): A {
        return f.apply(undefined, this.Pair());
    }

    private x: number;
    private y: number;
}