/// <reference path="../../util/vector.ts" />
/// <reference path="../../util/function.ts" />

interface MouseEventCallback {
    (pos: Vector): void;
}
interface MouseEventDispatcher {
    MouseHold: MouseEventCallback;
    MouseClick: MouseEventCallback;
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
    MouseHold?: MouseEventCallback;
    MouseClick?: MouseEventCallback;
    MouseUp?: MouseEventCallback;
    KeyDown?: KeyboardEventCallback;
    KeyUp?: KeyboardEventCallback;
    KeyPress?: KeyboardEventCallback;
    Resize?: (width: number, height: number) => void;
}

class EventDispatcherImpl implements EventDispatcher {
    constructor(opt: EventDispatchOption) {
        this.MouseHold = opt.MouseHold ? opt.MouseHold : Func.Noop;
        this.MouseClick = opt.MouseClick ? opt.MouseClick : Func.Noop;
        this.MouseUp = opt.MouseUp ? opt.MouseUp : Func.Noop;
        this.KeyDown = opt.KeyDown ? opt.KeyDown : Func.Noop;
        this.KeyUp = opt.KeyUp ? opt.KeyUp : Func.Noop;
        this.KeyPress = opt.KeyPress ? opt.KeyPress : Func.Noop;
    }
    MouseHold: MouseEventCallback;
    MouseClick: MouseEventCallback;
    MouseUp: MouseEventCallback;
    KeyDown: KeyboardEventCallback;
    KeyUp: KeyboardEventCallback;
    KeyPress: KeyboardEventCallback;
}