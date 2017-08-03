/// <reference path="../game-control/event-dispatcher.ts" />
/// <reference path="../../util/vector.ts" />
/// <reference path="../../util/bound.ts" />
/// <reference path="../../util/function.ts" />

interface MouseEventCatcher {
    MouseDown: MouseEventCallback;
    MouseUp: MouseEventCallback;
    MouseMove: MouseEventCallback;
}

interface Holdable {
    Hold: MouseEventCallback;
    Release: MouseEventCallback;
}

interface Clickable {
    Click: MouseEventCallback;
}

class ClickButton<B extends Bound = Bound>
    implements Clickable, MouseEventCatcher {
    constructor(onClick: MouseEventCallback, bound: B) {
        this.Click = onClick;
        this.bound = bound;
    }
    MouseDown(pos: Vector): void {
        if (this.bound.Contains(pos)) {
            ++this.count;
        }
    }
    MouseUp(pos: Vector): void {
        if (this.count > 0 && this.bound.Contains(pos)) {
            this.Click(pos);
            this.count = 0;
        }
    }
    MouseMove(pos: Vector): void { }

    Click: MouseEventCallback;
    bound: B;
    count: number = 0;
}

class HoldButton<B extends Bound = Bound>
    implements Holdable, MouseEventCatcher {
    constructor(
        onHold: MouseEventCallback,
        onRelease: MouseEventCallback,
        bound: B) {
        this.Hold = onHold;
        this.Release = onRelease;
        this.bound = bound;
    }
    MouseDown(pos: Vector): void {
        if (this.bound.Contains(pos)) this.Hold(pos);
    }

    MouseUp(pos: Vector): void {
        if (this.bound.Contains(pos)) this.Release(pos);
    }

    MouseMove(pos: Vector): void {
        if (this.bound.Contains(pos)) this.Hold(pos);
    }

    Hold: MouseEventCallback;
    Release: MouseEventCallback;
    bound: B;
}

class Button<B extends Bound = Bound>
    implements Holdable, Clickable, MouseEventCatcher {
    constructor(
        bound: B, onClick: MouseEventCallback,
        onHold: MouseEventCallback, onRelease: MouseEventCallback) {
        this.bound = bound;
        this.Click = onClick;
        this.Hold = onHold;
        this.Release = onRelease;
    }
    MouseDown(pos: Vector): void {
        if (this.bound.Contains(pos)) {
            ++this.count;
            this.Hold(pos);
        }
    }
    MouseUp(pos: Vector): void {
        if (this.bound.Contains(pos)) {
            this.Release(pos);
            if (this.count > 0) {
                this.Click(pos);
                this.count = 0;
            }
        }
    }
    MouseMove(pos: Vector): void {
        if (this.bound.Contains(pos)) this.Hold(pos);
    }
    Hold: MouseEventCallback;
    Release: MouseEventCallback;
    Click: MouseEventCallback;
    bound: B;
    count: number = 0;
}

namespace Button {
    export function Noop() {
        return {
            MouseDown: Func.Noop,
            MouseUp: Func.Noop,
            MouseMove: Func.Noop
        }
    }
    export function AddTwo(
        a: MouseEventCatcher, b: MouseEventCatcher): MouseEventCatcher {
        return {
            MouseDown: pos => {
                a.MouseDown(pos);
                b.MouseDown(pos);
            },
            MouseMove: pos => {
                a.MouseMove(pos);
                b.MouseMove(pos);
            },
            MouseUp: pos => {
                a.MouseUp(pos);
                b.MouseUp(pos);
            }
        };
    }
    export function Add(
        m: MouseEventCatcher,
        ...ms: MouseEventCatcher[]): MouseEventCatcher {
        return Func.foldl(ms, m, AddTwo);
    }
}
