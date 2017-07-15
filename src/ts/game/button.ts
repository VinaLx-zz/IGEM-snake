/// <reference path="./interfaces.ts" />

interface ButtonCallback {
    (pos: Vector): void;
}

interface ClickButtonLike {
    ClickAt: ButtonCallback;
}

interface HoldButtonLike {
    HoldAt: ButtonCallback;
}

interface ButtonLike extends ClickButtonLike, HoldButtonLike { }

class ClickButton implements ClickButtonLike, Bounding {
    constructor(onClick: ButtonCallback, bound: Bound) {
        this.onClick = onClick;
        this.bound = bound;
    }
    ClickAt(pos: Vector): void {
        if (this.bound.Contains(pos)) {
            this.onClick(pos);
        }
    }
    onClick: ButtonCallback;
    bound: Bound;
}

class HoldButton implements HoldButtonLike, Bounding {
    constructor(onHold: ButtonCallback, bound: Bound) {
        this.onHold = onHold;
        this.bound = bound;
    }
    HoldAt(pos: Vector): void {
        if (this.bound.Contains(pos)) {
            this.onHold(pos);
        }
    }
    onHold: ButtonCallback;
    bound: Bound;
}

class Button implements ButtonLike, Bounding {
    constructor(onClick: ButtonCallback, onHold: ButtonCallback, bound: Bound) {
        this.clickButton = new ClickButton(onClick, bound);
        this.holdButton = new HoldButton(onHold, bound);
        this.bound = bound;
    }
    HoldAt(pos: Vector): void {
        this.holdButton.HoldAt(pos);
    }
    ClickAt(pos: Vector): void {
        this.clickButton.ClickAt(pos);
    }
    clickButton: ClickButton;
    holdButton: HoldButton;
    bound: Bound;
}

namespace Button {
    // button combinations

    // add click click
    export function AddCC(
        b1: ClickButtonLike, b2: ClickButtonLike): ClickButtonLike {
        return {
            ClickAt: (pos: Vector) => {
                b1.ClickAt(pos);
                b2.ClickAt(pos);
            }
        }
    }
    // add hold hold
    export function AddHH(
        b1: HoldButtonLike, b2: HoldButtonLike): HoldButtonLike {
        return {
            HoldAt: (pos: Vector) => {
                b1.HoldAt(pos);
                b2.HoldAt(pos);
            }
        }
    }
    // add click hold
    export function AddCH(
        click: ClickButtonLike, hold: HoldButtonLike): ButtonLike {
        return {
            ClickAt: (pos: Vector) => click.ClickAt(pos),
            HoldAt: (pos: Vector) => hold.HoldAt(pos)
        }
    }
    // add hold click
    export function AddHC(
        hold: HoldButtonLike, click: ClickButtonLike): ButtonLike {
        return AddCH(click, hold);
    }
    export function AddC(
        btn: ButtonLike, click: ClickButtonLike): ButtonLike {
        return {
            ClickAt: (pos: Vector) => {
                btn.ClickAt(pos);
                click.ClickAt(pos);
            },
            HoldAt: (pos: Vector) => btn.HoldAt(pos)
        }
    }
    export function AddH(btn: ButtonLike, hold: HoldButtonLike): ButtonLike {
        return {
            ClickAt: (pos: Vector) => btn.ClickAt(pos),
            HoldAt: (pos: Vector) => {
                btn.HoldAt(pos);
                hold.HoldAt(pos);
            }
        }
    }
    export function Add(b1: ButtonLike, b2: ButtonLike): ButtonLike {
        return {
            ClickAt: (pos: Vector) => {
                b1.ClickAt(pos);
                b2.ClickAt(pos);
            },
            HoldAt: (pos: Vector) => {
                b1.HoldAt(pos);
                b2.HoldAt(pos);
            }
        }
    }
}