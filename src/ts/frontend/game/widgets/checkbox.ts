/// <reference path="./button.ts" />

class CheckBox<B extends Bound> extends ClickButton<B> {
    constructor(
        init: Boolean, bound: B,
        onChange: (checked: Boolean) => void) {
        super(() => {
            this.Toggle();
            onChange(this.checked);
        }, bound);
        this.checked = init;
    }
    Check(): void { this.checked = true; }
    Uncheck(): void { this.checked = false; }
    Toggle(): void { this.checked = !this.checked; }

    checked: Boolean;
}