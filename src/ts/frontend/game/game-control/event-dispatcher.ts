/// <reference path="../../util/vector.ts" />
/// <reference path="../../util/function.ts" />

interface MouseEventCallback {
    (pos: Vector): void;
}
interface MouseEventDispatcher {
    MouseMove: MouseEventCallback;
    MouseDown: MouseEventCallback;
    MouseUp: MouseEventCallback;
}

interface KeyboardEventCallback {
    (key: number): void;
}

interface KeyboardEventDispatcher {
    KeyDown: KeyboardEventCallback;
    KeyUp: KeyboardEventCallback;
    KeyPress: KeyboardEventCallback;
}

interface EventDispatcher extends
    MouseEventDispatcher,
    KeyboardEventDispatcher{ }

interface EventDispatchOption {
    MouseMove?: MouseEventCallback;
    MouseDown?: MouseEventCallback;
    MouseUp?: MouseEventCallback;
    KeyDown?: KeyboardEventCallback;
    KeyUp?: KeyboardEventCallback;
    KeyPress?: KeyboardEventCallback;
}

class EventDispatcherImpl implements EventDispatcher {
    constructor(opt: EventDispatchOption) {
        this.MouseMove = opt.MouseMove ? opt.MouseMove : Func.Noop;
        this.MouseDown = opt.MouseDown ? opt.MouseDown : Func.Noop;
        this.MouseUp = opt.MouseUp ? opt.MouseUp : Func.Noop;
        this.KeyDown = opt.KeyDown ? opt.KeyDown : Func.Noop;
        this.KeyUp = opt.KeyUp ? opt.KeyUp : Func.Noop;
        this.KeyPress = opt.KeyPress ? opt.KeyPress : Func.Noop;
    }

    OnMouseMove(cb: MouseEventCallback) {
        this.MouseMove = Func.seq(this.MouseMove, cb);
    }
    OnMouseDown(cb: MouseEventCallback) {
        this.MouseDown = Func.seq(this.MouseDown, cb);
    }
    OnMouseUp(cb: MouseEventCallback) {
        this.MouseUp = Func.seq(this.MouseUp, cb);
    }
    OnKeyDown(cb: KeyboardEventCallback) {
        this.KeyDown = Func.seq(this.KeyDown, cb);
    }
    OnKeyUp(cb: KeyboardEventCallback) {
        this.KeyUp = Func.seq(this.KeyUp, cb);
    }
    OnKeyPress(cb: KeyboardEventCallback) {
        this.KeyPress = Func.seq(this.KeyPress, cb);
    }

    MouseMove: MouseEventCallback;
    MouseDown: MouseEventCallback;
    MouseUp: MouseEventCallback;
    KeyDown: KeyboardEventCallback;
    KeyUp: KeyboardEventCallback;
    KeyPress: KeyboardEventCallback;
}