/// <reference path="./abstract-layer.ts" />
/// <reference path="../widgets/checkbox.ts" />
/// <reference path="../widgets/slider.ts" />
/// <reference path="../widgets/close-button.ts" />

class SettingLayer extends AbstractLayer {
    constructor(control: LayerControl) {
        super(control, {});
    }
    Painter(): Painter {
        return Paint.Rect("white", 0, 0, 1200, 600)
            .Then(SettingLayer.SlidingPainter(this.soundEffect))
            .Then(SettingLayer.SlidingPainter(this.music))
            .Then(SettingLayer.CheckBoxPainter(this.left))
            .Then(SettingLayer.CheckBoxPainter(this.right))
            .Then(SettingLayer.CloseButtonPainter());
    }
    Buttons(): MouseEventCatcher {
        const soundBound = new RectBound(100, 100, 800, 100);
        this.soundEffect = new SlidingBar(50, soundBound, Func.Noop);
        const musicBound = new RectBound(100, 300, 800, 100);
        this.music = new SlidingBar(50, musicBound, Func.Noop);
        const leftBound = new CircleBound(150, 400, 50);
        const rightBound = new CircleBound(850, 400, 50);
        this.left = new CheckBox(false, leftBound, new Vector(150, 400),
            b => { this.right.checked = !b })
        this.right = new CheckBox(true, rightBound, new Vector(850, 400),
            b => { this.left.checked = !b })
        const closeBound = new RectBound(0, 0, 50, 50);
        this.close = new CloseButton(closeBound, this.control);
        return Button.Add(
            this.soundEffect, this.music, this.left, this.right, this.close);
    }

    soundEffect: SlidingBar;
    music: SlidingBar;
    left: CheckBox;
    right: CheckBox;
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
    private static CheckBoxPainter(bar: CheckBox): Painter {
        const pos = bar.position;
        return Paint.Delay(() =>
            Paint.Circle(bar.checked ? "green" : "red", pos.X, pos.Y, 50));
    }
    private static CloseButtonPainter(): Painter {
        return Paint.Rect("black", 0, 0, 50, 50);
    }
}