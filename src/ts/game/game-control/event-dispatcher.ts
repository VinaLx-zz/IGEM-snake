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
    MouseMove: MouseEventCallback;
    MouseDown: MouseEventCallback;
    MouseUp: MouseEventCallback;
    KeyDown: KeyboardEventCallback;
    KeyUp: KeyboardEventCallback;
    KeyPress: KeyboardEventCallback;
}