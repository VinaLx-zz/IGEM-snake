/// <reference path="./abstract-layer.ts" />
/// <reference path="../widgets/close-button.ts" />

class ModeChooseLayer extends AbstractLayer {
    constructor(control: LayerControl) {
        super(control, {});
    }
    Painter(): Painter {
        return Paint.Background(IMG.BG.mode)
            .Then(Paint.PositionedImage(this.back.bound, IMG.BTN.back))
            .Then(Paint.PositionedImage(this.easy.bound, IMG.BTN.easy))
            .Then(Paint.PositionedImage(this.normal.bound, IMG.BTN.normal))
            .Then(Paint.PositionedImage(this.hard.bound, IMG.BTN.hard))
            .Then(Paint.PositionedImage(this.tutorial.bound, IMG.BTN.tutorial));
    }
    Buttons(): MouseEventCatcher {
        this.back = new CloseButton(
            new RectBound(
                SZ.BACK_X, SZ.BACK_Y, SZ.BACK_W, SZ.BACK_H), this.control);
        const mx = SZ.MODE.MODE_X, mw = SZ.MODE.MODE_W, mh = SZ.MODE.MODE_H;
        this.easy = new ClickButton(
            Func.Noop, new RectBound(mx, SZ.MODE.EASY_Y, mw, mh));
        this.normal = new ClickButton(
            Func.Noop, new RectBound(mx, SZ.MODE.NORMAL_Y, mw, mh));
        this.hard = new ClickButton(
            Func.Noop, new RectBound(mx, SZ.MODE.HARD_Y, mw, mh));
        this.tutorial = new ClickButton(
            Func.Noop, new RectBound(
                SZ.MODE.TUTORIAL_X,
                SZ.MODE.TUTORIAL_Y,
                SZ.MODE.TUTORIAL_W,
                SZ.MODE.TUTORIAL_H));
        return Button.Add(
            this.back, this.easy, this.hard, this.normal, this.tutorial);
    }
    back: CloseButton<RectBound>
    easy: ClickButton<RectBound>
    normal: ClickButton<RectBound>
    hard: ClickButton<RectBound>
    tutorial: ClickButton<RectBound>
}