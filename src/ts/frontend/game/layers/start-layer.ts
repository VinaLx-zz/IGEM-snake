/// <reference path="./abstract-layer.ts" />
/// <reference path="./setting-layer.ts" />

class StartLayer extends AbstractLayer {
    constructor(control: LayerControl) {
        super(control, {});
        this.settingLayer = new SettingLayer(control);
    }

    Painter(): Painter {
        return this.PaintBackground(
            1, SZ.HEIGHT_FACTOR / SZ.WIDTH_FACTOR)
            .Then(this.PaintSettingButton())
            .Then(this.PaintHelpButton())
            .Then(this.PaintStartButton());
    }

    PaintBackground(w: number, h: number): Painter {
        return Paint.Delay(() => Paint.Rect(this.color, 0, 0, w, h));
    }
    PaintStartButton(): Painter {
        return Paint.PositionedImage(this.start.bound, IMG.BTN.start);
    }
    PaintHelpButton(): Painter {
        return Paint.PositionedImage(this.help.bound, IMG.BTN.start);
    }
    PaintSettingButton(): Painter {
        return Paint.PositionedImage(this.setting.bound, IMG.BTN.start);
    }

    Buttons(): MouseEventCatcher {
        this.start = new ClickButton(
            () => this.color = "red",
            new CircleBound(
                SZ.START.PLAY_X, SZ.START.PLAY_Y, SZ.START.BUTTON_R));
        this.help = new ClickButton(
            () => this.color = "yellow",
            new CircleBound(
                SZ.START.HELP_X, SZ.START.HELP_Y, SZ.START.BUTTON_R));
        this.setting = new ClickButton(
            () => this.control.PushLayer(this.settingLayer),
            new CircleBound(
                SZ.START.SETTING_X, SZ.START.SETTING_Y, SZ.START.BUTTON_R));

        return Button.Add(this.start, this.help, this.setting);
    }

    color: string = "yellow";
    start: ClickButton<CircleBound>;
    help: ClickButton<CircleBound>;
    setting: ClickButton<CircleBound>;

    settingLayer: Layer;
}