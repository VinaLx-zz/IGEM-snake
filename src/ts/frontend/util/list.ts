type LNode<T> = Value<T> | null;

interface Value<T> {
    value: T;
    next: LNode<T>;
}

class LIterator<T> {
    constructor(before: Value<T>, list: List<T>) {
        this.beforebefore = null;
        this.before = before;
        this.list = list; }
    HasNext(): Boolean {
        return this.before.next !== null;
    }
    Next(): T {
        if (this.before.next === null)
            throw "Iterator: Calling Next on a iterator which has no next element";
        this.beforebefore = this.before;
        this.before = this.before.next;
        return this.before.value;
    }
    Remove(): Boolean {
        if (this.beforebefore === null)
            return false;
        this.beforebefore.next = this.before.next;
        this.before = this.beforebefore;
        this.beforebefore = null;
        --this.list.size;
        return true;
    }
    beforebefore: Value<T> | null;
    before: Value<T>;
    list: List<T>;
}

class List<T> {
    Push(v: T): void {
        this.head.next = {
            value: v,
            next: this.head.next
        }
        ++this.size;
    }
    Pop(v: T): void {
        if (this.head.next === null)
            return;
        this.head.next = this.head.next.next;
        --this.size;
    }
    Front(): T {
        if (this.head.next === null)
            throw "List: Calling front on empty List"
        return this.head.next.value;
    }
    Size(): number {
        return this.size;
    }
    Iterator(): LIterator<T> {
        return new LIterator(this.head, this);
    }
    ForEach(f: (t: T) => void) {
        for (let iter = this.Iterator(); iter.HasNext(); ) {
            f(iter.Next());
        }
    }
    RemoveIf(p: (t: T) => void): T[] {
        const result: T[] = [];
        for (let iter = this.Iterator(); iter.HasNext(); ) {
            const t = iter.Next();
            if (p(t)) {
                result.push(t);
                iter.Remove();
            }
        }
        return result;
    }
    size: number = 0;
    head: Value<T> = <Value<T>>{next: null};
}

namespace List {
    export function Empty<T>(): List<T> {
        return new List();
    }
    export function FromArray<T>(ts: T[]): List<T> {
        const result = Empty<T>();
        for (let i = ts.length - 1; i >= 0; --i) {
            result.Push(ts[i]);
        }
        return result;
    }
}