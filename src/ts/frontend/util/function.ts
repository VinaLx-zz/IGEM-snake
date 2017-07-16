namespace Func {
    export function Noop(): void {}
    export function foldl<A, B>(as: A[], z: B, f: (b: B, a: A) => B): B {
        let res = z;
        for (let a of as) {
            res = f(res, a);
        }
        return res;
    }
}