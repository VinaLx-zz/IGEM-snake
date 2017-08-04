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
            .Then(this.easy.Painter())
            .Then(this.normal.Painter())
            .Then(this.hard.Painter());
    }
    Buttons(): MouseEventCatcher {
        this.back = new CloseButton(
            new RectBound(
                SZ.BACK_X, SZ.BACK_Y, SZ.BACK_W, SZ.BACK_H), this.control);
        const mx = SZ.MODE.MODE_X, mw = SZ.MODE.MODE_W, mh = SZ.MODE.MODE_H;
        this.easy = new AnimatedButton(
            new RectBound(mx, SZ.MODE.EASY_Y, mw, mh),
            IMG.BTN.easy, IMG.BTN.easyFocus,
            this.NewGame(Level.Easy));
        this.normal = new AnimatedButton(
            new RectBound(mx, SZ.MODE.NORMAL_Y, mw, mh),
            IMG.BTN.normal, IMG.BTN.normalFocus,
            this.NewGame(Level.Normal));
        this.hard = new AnimatedButton(
            new RectBound(mx, SZ.MODE.HARD_Y, mw, mh),
            IMG.BTN.hard, IMG.BTN.hardFocus,
            this.NewGame(Level.Hard));
        return Button.Add(
            this.back, this.easy, this.hard, this.normal);
    }
    NewGame(level: Level): () => void {
        return () => {
            this.control.PopLayer();
            const gameLayer = game.NewGameByLevel(level, this.control);
            this.control.PushLayer(gameLayer);
            gameLayer.Start();
        }
    }
    back: CloseButton<RectBound>
    easy: AnimatedButton<RectBound>
    normal: AnimatedButton<RectBound>
    hard: AnimatedButton<RectBound>
}