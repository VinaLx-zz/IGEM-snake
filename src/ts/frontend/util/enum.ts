interface Enum {
    [n: number]: string;
}

namespace Enum {
    export function Names(e: Enum): string[] {
        let n = Object.keys(e);
        return n.slice(n.length / 2);
    }
    export function Values(e: Enum): number[] {
        let n = Object.keys(e);
        return n.slice(0, n.length / 2).map(s => parseInt(s));
    }
}