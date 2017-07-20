/// <reference path="./abstract-layer.ts" />
/// <reference path="./setting-layer.ts" />
/// <reference path="./mode-choose-layer.ts" />
/// <reference path="./help-layer.ts" />

class StartLayer extends AbstractLayer {
    constructor(control: LayerControl) {
        super(control, {});
        this.settingLayer = new SettingLayer(control);
        this.helpLayer = new HelpLayer(control);
        this.modeLayer = new ModeChooseLayer(control);
    }

    Painter(): Painter {
        return this.PaintBackground()
            .Then(this.PaintSettingButton())
            .Then(this.PaintHelpButton())
            .Then(this.PaintStartButton());
    }

    PaintBackground(): Painter {
        return Paint.Background(IMG.BG.start);
    }
    PaintStartButton(): Painter {
        return Paint.PositionedImage(this.start.bound, IMG.BTN.start);
    }
    PaintHelpButton(): Painter {
        return Paint.PositionedImage(this.help.bound, IMG.BTN.help);
    }
    PaintSettingButton(): Painter {
        return Paint.PositionedImage(this.setting.bound, IMG.BTN.setting);
    }

    Buttons(): MouseEventCatcher {
        this.start = new ClickButton(
            () => this.control.PushLayer(this.modeLayer),
            new CircleBound(
                SZ.START.PLAY_X, SZ.START.PLAY_Y, SZ.START.BUTTON_R));
        this.help = new ClickButton(
            () => this.control.PushLayer(this.helpLayer),
            new CircleBound(
                SZ.START.HELP_X, SZ.START.HELP_Y, SZ.START.BUTTON_R));
        this.setting = new ClickButton(
            () => this.control.PushLayer(this.settingLayer),
            new CircleBound(
                SZ.START.SETTING_X, SZ.START.SETTING_Y, SZ.START.BUTTON_R));

        return Button.Add(this.start, this.help, this.setting);
    }

    start: ClickButton<CircleBound>;
    help: ClickButton<CircleBound>;
    setting: ClickButton<CircleBound>;

    settingLayer: Layer;
    helpLayer: Layer;
    modeLayer: Layer;
}