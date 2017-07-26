namespace Func {
    export function Noop(): void {}
    export function foldl<A, B>(as: A[], z: B, f: (b: B, a: A) => B): B {
        let res = z;
        for (let a of as) {
            res = f(res, a);
        }
        return res;
    }
    export function seq<A>(
        lhs: (a: A) => void, rhs: (b: A) => void): (a: A) => void {
        return a => {
            lhs(a);
            rhs(a);
        }
    }

    /**
     * assign routine from TS documentation
     */
    export function Assign<A>(a: A, props: Partial<A>): void {
        for (const prop in props) {
            const v = props[prop];
            if (v) a[prop] = v;
        }
    }
}