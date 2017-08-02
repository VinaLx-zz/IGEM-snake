/// Random Monad
class RandGen<A> {
    constructor(gen: () => A) {
        this.gen = gen;
    }
    Next(): A {
        return this.gen();
    }
    Map<B>(f: (a: A) => B): RandGen<B> {
        return new RandGen(() => f(this.gen()));
    }
    Bind<B>(f: (a: A) => RandGen<B>) {
        return new RandGen(() => f(this.gen()).gen());
    }
    Map2<B, C>(b: RandGen<B>, f: (a: A, b: B) => C): RandGen<C> {
        return this.Bind(a => b.Map(b => f(a, b)));
    }
    gen: () => A;
}

namespace Random {
    export function Const<A>(a: A): RandGen<A> {
        return new RandGen(Func.Const(a));
    }
    export const Random: RandGen<number> = new RandGen(Math.random);

    export function Map2<A, B, C>(
        ra: RandGen<A>, rb: RandGen<B>, f: (a: A, b: B) => C): RandGen<C> {
        return ra.Map2(rb, f);
    }

    export function Nat(upperBound: number): RandGen<number> {
        return Random.Map(n => Math.floor(n * upperBound));
    }
    export function NonNeg(upperBound: number): RandGen<number> {
        return Random.Map(n => n * upperBound);
    }
    export function OneOf<A>(as: A[]): RandGen<A> {
        return Nat(as.length).Map(n => as[n]);
    }
    export function Uniform<A>(...as: A[]): RandGen<A> {
        return OneOf(as);
    }
    export function WeightedGen<A>(...ras: [RandGen<A>, number][]): RandGen<A> {
        let sum = 0;
        for (const [ra, n] of ras) sum += n;
        return NonNeg(sum).Bind(n => {
            let u = 0;
            for (const [ra, weight] of ras) {
                u += weight;
                if (n < u) return ra;
            }
            throw "WeightedGen: code should never reach here";
        })
    }
    // can only use WeightedGen and Const
    // but type system of typescript about 'Pair' is so inconsistent
    export function Weighted<A>(...as: [A, number][]): RandGen<A> {
        let sum = 0;
        for (const [ra, n] of as) sum += n;
        return NonNeg(sum).Map(n => {
            let u = 0;
            for (const [ra, weight] of as) {
                u += weight;
                if (n < u) return ra;
            }
            throw "Weighted: code should never reach here";
        });
    }
}