/// <reference path="./button.ts" />

class CheckBox extends ClickButton {
    constructor(
        init: Boolean, bound: Bound, pos: Vector,
        onChange: (checked: Boolean) => void) {
        super(() => {
            this.Toggle();
            onChange(this.checked);
        }, bound);
        this.checked = init;
        this.position = pos;
    }
    Check(): void { this.checked = true; }
    Uncheck(): void { this.checked = false; }
    Toggle(): void { this.checked = !this.checked; }

    position: Vector;
    checked: Boolean;
}