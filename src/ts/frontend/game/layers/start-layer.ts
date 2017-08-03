/// <reference path="./abstract-layer.ts" />
/// <reference path="./mode-choose-layer.ts" />
/// <reference path="./help-layer.ts" />

class StartLayer extends AbstractLayer {
    constructor(control: LayerControl) {
        super(control, {});
        this.helpLayer = new HelpLayer(control);
        this.modeLayer = new ModeChooseLayer(control);
    }

    Painter(): Painter {
        return this.PaintBackground()
            .Then(this.PaintHelpButton())
            .Then(this.PaintStartButton());
    }

    PaintBackground(): Painter {
        return Paint.Background(IMG.BG.start);
    }
    PaintStartButton(): Painter {
        return this.start.Painter();
    }
    PaintHelpButton(): Painter {
        return this.help.Painter();
    }

    Buttons(): MouseEventCatcher {
        this.start = new AnimatedButton(
            new CircleBound(
                SZ.START.BUTTON_X, SZ.START.PLAY_Y, SZ.START.BUTTON_R),
            IMG.BTN.start, IMG.BTN.startFocus,
            () => this.control.PushLayer(this.modeLayer));
        this.help = new AnimatedButton(
            new CircleBound(
                SZ.START.BUTTON_X, SZ.START.HELP_Y, SZ.START.BUTTON_R),
            IMG.BTN.help, IMG.BTN.helpFocus,
            () => this.control.PushLayer(this.helpLayer));
        return Button.Add(this.start, this.help);
    }

    start: AnimatedButton<CircleBound>;
    help: AnimatedButton<CircleBound>;

    helpLayer: Layer;
    modeLayer: Layer;
}