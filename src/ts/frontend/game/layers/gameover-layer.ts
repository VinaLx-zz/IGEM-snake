/// <reference path="./abstract-layer.ts" />
/// <reference path="./biology-layer.ts" />

interface GameResult {
    win: Boolean;
    time: number;
    foodEaten: number;
    targetCompleted: number;
}

class GameOverLayer extends AbstractLayer {
    constructor(
        gameResult: GameResult,
        gameRestart: () => void,
        control: LayerControl) {
        super(control, {}, true);
        this.gameResult = gameResult;
        this.restartCallback = gameRestart;
        this.background =
            gameResult.win ? IMG.GAMEOVER.success : IMG.GAMEOVER.fail;
        this.Init();
    }
    Painter(): Painter {
        return Paint.Picture(
            this.background, SZ.GAMEOVER.BACKGROUND_X, SZ.GAMEOVER.BACKGROUND_Y,
            SZ.GAMEOVER.BACKGROUND_W, SZ.GAMEOVER.BACKGROUND_H)
            .Then(this.restart.Painter())
            .Then(this.mainMenu.Painter())
            .Then(this.learn.Painter())
            .Then(this.PaintTime())
            .Then(this.PaintParts());
    }
    private PaintTime(): Painter {
        let sec = Math.round(this.gameResult.time);
        let min = Math.floor(sec / 60);
        sec = sec % 60;
        return Paint.Text(
            `${SZ.GAMEOVER.FONT_SIZE}px MSYaHei`,
            `${min}: ${sec}`,
            SZ.GAMEOVER.TIME_X, SZ.GAMEOVER.TIME_Y, "rgb(93,93,93)");
    }
    private PaintParts(): Painter {
        return Paint.Text(
            `${SZ.GAMEOVER.FONT_SIZE}px MSYaHei`,
            `${Math.round(this.gameResult.foodEaten)}`,
            SZ.GAMEOVER.PART_X, SZ.GAMEOVER.PART_Y, "rgb(93,93,93)");
    }
    private PaintTargetComplete(): Painter {
        return Paint.Text(
            `${SZ.GAMEOVER.FONT_SIZE}px MSYaHei`,
            `${this.gameResult.targetCompleted}`,
            SZ.GAMEOVER.TARGET_X, SZ.GAMEOVER.TARGET_Y, "rgb(93,93,93)");
    }
    Buttons(): MouseEventDispatcher {
        this.learn = this.MakeLearnButton();
        this.restart = this.MakeRestartButton();
        this.mainMenu = this.MakeMainMenuButton();
        const share = this.MakeShareButton();
        return Button.Add(share, this.learn, this.restart, this.mainMenu);
    }
    private MakeLearnButton() {
        return new AnimatedButton(
            new RectBound(
                SZ.GAMEOVER.LEARN_X, SZ.GAMEOVER.LEARN_Y,
                SZ.GAMEOVER.LEARN_W, SZ.GAMEOVER.LEARN_H),
            IMG.GAMEOVER.learn, IMG.GAMEOVER.learnFocus, () => {
                this.MainMenu();
                this.control.PushLayer(new BiologyLayer(this.control));
            });
    }
    private MakeRestartButton() {
        return new AnimatedButton(
            new RectBound(
                SZ.GAMEOVER.RESTART_X, SZ.GAMEOVER.BUTTON_Y,
                SZ.GAMEOVER.BUTTON_W, SZ.GAMEOVER.BUTTON_H),
            IMG.BTN.restart, IMG.BTN.restartFocus, () => this.Restart());
    }
    private MakeMainMenuButton() {
        return new AnimatedButton(
            new RectBound(
                SZ.GAMEOVER.MAINMENU_X, SZ.GAMEOVER.BUTTON_Y,
                SZ.GAMEOVER.BUTTON_W, SZ.GAMEOVER.BUTTON_H),
            IMG.BTN.mainMenu, IMG.BTN.mainMenuFocus, () => this.MainMenu());
    }
    private MakeShareButton() {
        const b = Bound.Sub(
            new RectBound(0, 0, 1, 0.75),
            Bound.Add(
                this.learn.bound, this.restart.bound, this.mainMenu.bound));
        return new ClickButton(() => share.Show(), b);
    }
    private MainMenu(): void {
        for (; this.control.LayerSize() > 1;)this.control.PopLayer();
    }
    private Restart(): void {
        this.control.PopLayer();
        this.restartCallback();
    }
    background: HTMLImageElement;
    gameResult: GameResult;
    learn: AnimatedButton<RectBound>;
    restart: AnimatedButton<RectBound>;
    mainMenu: AnimatedButton<RectBound>;
    restartCallback: () => void;
}