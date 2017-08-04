/// <reference path="./abstract-layer.ts" />

class TutorialLayer extends AbstractLayer {
    constructor(control: LayerControl) {
        super(control, {});
    }
    Buttons(): MouseEventDispatcher {
        return Button.Noop();
    }
    Painter(): Painter {
        return Paint.Noop();
    }
}
