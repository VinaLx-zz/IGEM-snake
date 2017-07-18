/// <reference path="./button.ts" />
/// <reference path="../game-control/layer-control.ts" />

class CloseButton<B extends Bound = Bound> extends ClickButton<B> {
    constructor(bound: B, control: LayerControl) {
        super(() => control.PopLayer(), bound);
    }
}
