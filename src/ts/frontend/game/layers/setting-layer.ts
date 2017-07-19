/// <reference path="./abstract-layer.ts" />
/// <reference path="../widgets/checkbox.ts" />
/// <reference path="../widgets/slider.ts" />
/// <reference path="../widgets/close-button.ts" />

class SettingLayer extends AbstractLayer {
    constructor(control: LayerControl) {
        super(control, {});
    }
    Painter(): Painter {
        return this.PaintBackground()
            .Then(this.PaintMiddle());
    }
    private PaintBackground(): Painter {
        return Paint.Rect(
            "brown", 0, 0, 1, SZ.HEIGHT_FACTOR / SZ.WIDTH_FACTOR);
    }
    private PaintMiddle() {
        return Paint.Rect(
            "gray",
            SZ.SETTING.LAYER_X,
            SZ.SETTING.LAYER_Y,
            SZ.SETTING.LAYER_W,
            SZ.SETTING.LAYER_H)
    }

    Buttons(): MouseEventCatcher {
        return Button.Noop();
    }

    soundEffect: SlidingBar;
    music: SlidingBar;
    left: CheckBox<RectBound>;
    right: CheckBox<RectBound>;
    close: CloseButton;

    private static SlidingPainter(bar: SlidingBar): Painter {
        const b = bar.bound;
        return Paint.Rect("red", b.Left(), b.Up(), b.Width(), b.Height())
            .Then(Paint.Delay(() =>
                Paint.Rect("black", bar.slider - 10, b.Up(), 20, b.Height())
            )).Then(Paint.Delay(() =>
                Paint.Rect("green", b.Left(), b.Up(), bar.slider - b.Left() - 10, b.Height())
            ))
    }
    private static CheckBoxPainter(bar: CheckBox<RectBound>): Painter {
        return Paint.Noop();
    }
    private static CloseButtonPainter(): Painter {
        return Paint.Rect("black", 0, 0, 50, 50);
    }
}