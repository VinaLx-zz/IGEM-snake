
class GameLayer extends AbstractLayer {
    constructor(control: LayerControl) {
        super(control, {})
    }
    Painter(): Painter {
        return Paint.Noop();
    }
    Buttons(): MouseEventCatcher {
        return Button.Noop();
    }
}