/// <reference path="./abstract-layer.ts" />
/// <reference path="../widgets/close-button.ts" />
/// <reference path="./game-layer.ts" />

class ModeChooseLayer extends AbstractLayer {
    constructor(control: LayerControl) {
        super(control, {});
    }
    Painter(): Painter {
        return Paint.Background(IMG.BG.mode)
            .Then(Paint.PositionedImage(this.back.bound, IMG.BTN.back))
            .Then(Paint.PositionedImage(this.easy.bound, IMG.BTN.easy))
            .Then(Paint.PositionedImage(this.normal.bound, IMG.BTN.normal))
            .Then(Paint.PositionedImage(this.hard.bound, IMG.BTN.hard));
    }
    Buttons(): MouseEventCatcher {
        this.back = new CloseButton(
            new RectBound(
                SZ.BACK_X, SZ.BACK_Y, SZ.BACK_W, SZ.BACK_H), this.control);
        const mx = SZ.MODE.MODE_X, mw = SZ.MODE.MODE_W, mh = SZ.MODE.MODE_H;
        this.easy = new ClickButton(
            this.NewGame(Level.Easy),
            new RectBound(mx, SZ.MODE.EASY_Y, mw, mh));
        this.normal = new ClickButton(
            this.NewGame(Level.Normal),
            new RectBound(mx, SZ.MODE.NORMAL_Y, mw, mh));
        this.hard = new ClickButton(
            this.NewGame(Level.Hard),
            new RectBound(mx, SZ.MODE.HARD_Y, mw, mh));
        return Button.Add(
            this.back, this.easy, this.hard, this.normal);
    }
    NewGame(level: Level): () => void {
        return () => {
            this.control.PopLayer();
            this.control.PushLayer(game.NewGameByLevel(level, this.control));
        }
    }
    back: CloseButton<RectBound>
    easy: ClickButton<RectBound>
    normal: ClickButton<RectBound>
    hard: ClickButton<RectBound>
}