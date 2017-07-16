/// <reference path="../game-control/event-dispatcher.ts" />
/// <reference path="../../util/vector.ts" />
/// <reference path="../../util/bound.ts" />
/// <reference path="../../util/function.ts" />
/// <reference path="./interfaces.ts" />

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

class ClickButton implements Clickable, MouseEventCatcher, Bounding {
    constructor(onClick: MouseEventCallback, bound: Bound) {
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
            this.count == 0;
        }
    }
    MouseMove(pos: Vector): void {
        // do nothing
        // TODO: can optimize the click logic when there is single touch
    }

    Click: MouseEventCallback;
    bound: Bound;
    count: number = 0;
}

class HoldButton implements Holdable, MouseEventCatcher, Bounding {
    constructor(
        onHold: MouseEventCallback,
        onRelease: MouseEventCallback,
        bound: Bound) {
        this.Hold = onHold;
        this.Release = onRelease;
        this.bound = bound;
    }
    MouseDown(pos: Vector): void {
        if (this.bound.Contains(pos)) {
            this.Hold(pos);
        }
    }

    MouseUp(pos: Vector): void {
        if (this.bound.Contains(pos)) {
            this.Release(pos);
        }
    }

    MouseMove(pos: Vector): void {
        if (this.bound.Contains(pos)) {
            this.Hold(pos);
        }
    }

    Hold: MouseEventCallback;
    Release: MouseEventCallback;
    bound: Bound;
}

namespace Button {
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
