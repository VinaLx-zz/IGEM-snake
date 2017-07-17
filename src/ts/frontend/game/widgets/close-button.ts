/// <reference path="./button.ts" />
/// <reference path="../game-control/layer-control.ts" />

class CloseButton extends ClickButton {
    constructor(bound: Bound, control: LayerControl) {
        super(() => control.PopLayer(), bound);
    }
}
