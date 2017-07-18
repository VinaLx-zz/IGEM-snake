/// <reference path="./abstract-layer.ts" />
/// <reference path="../widgets/circle-button.ts" />
/// <reference path="./setting-layer.ts" />

class StartLayer extends AbstractLayer {
    constructor(control: LayerControl) {
        super(control, {});
    }

    Painter(): Painter {
        return this.PaintBackground(1, SZ.HEIGHT_FACTOR / SZ.WIDTH_FACTOR)
            .Then(this.PaintSettingButton())
            .Then(this.PaintHelpButton())
            .Then(this.PaintStartButton());
    }
    PaintBackground(w: number, h: number): Painter {
        return Paint.Delay(() => Paint.Rect(this.color, 0, 0, w, h));
    }
    PaintStartButton(): Painter {
        return this.start.Paint();
    }
    PaintHelpButton(): Painter {
        return this.help.Paint();
    }
    PaintSettingButton(): Painter {
        return this.setting.Paint();
    }
    Buttons(): MouseEventCatcher {
        this.start = new CircleButton(
            SZ.START.PLAY_X, SZ.START.PLAY_Y, SZ.START.BUTTON_R,
            IMG.BTN.start, () => this.color = "white");
        this.setting = new CircleButton(
            SZ.START.SETTING_X, SZ.START.SETTING_Y, SZ.START.BUTTON_R,
            IMG.BTN.setting, () => this.color = "red");
        this.help = new CircleButton(
            SZ.START.HELP_X, SZ.START.HELP_Y, SZ.START.BUTTON_R,
            IMG.BTN.setting, () => this.color = "yellow");
        return Button.Add(this.start, this.help, this.setting);
    }
    color: string = "yellow";
    start: CircleButton;
    help: CircleButton;
    setting: CircleButton;
}