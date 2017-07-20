/// <reference path="./abstract-layer.ts" />
/// <reference path="../widgets/checkbox.ts" />
/// <reference path="../widgets/slider.ts" />
/// <reference path="../widgets/close-button.ts" />

class SettingLayer extends AbstractLayer {
    constructor(control: LayerControl) {
        super(control, {});
    }
    Painter(): Painter {
        return this.PaintBackground();
    }
    private PaintBackground(): Painter {
        return Paint.Background(IMG.BG.setting)
            .Then(Paint.PositionedImage(this.back.bound, IMG.BTN.back));
    }

    Buttons(): MouseEventCatcher {
        this.back = new CloseButton<RectBound>(
            new RectBound(
                SZ.BACK_X, SZ.BACK_Y, SZ.BACK_W, SZ.BACK_H), this.control);
        return this.back;
    }

    soundEffect: SlidingBar;
    music: SlidingBar;
    left: CheckBox<RectBound>;
    right: CheckBox<RectBound>;
    back: CloseButton<RectBound>;

    private static SlidingPainter(bar: SlidingBar): Painter {
        return Paint.Noop();
    }
    private static CheckBoxPainter(bar: CheckBox<RectBound>): Painter {
        return Paint.Noop();
    }
    private static CloseButtonPainter(): Painter {
        return Paint.Noop();
    }
}