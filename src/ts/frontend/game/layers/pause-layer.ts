/// <reference path="./abstract-layer.ts" />

class PauseLayer extends AbstractLayer {
    constructor(
        gameRestart: () => void,
        onQuit: () => void,
        game: GameLayer, control: LayerControl) {
        super(control, {}, true);
        this.restartCallback = gameRestart;
        this.Init();
        this.game = game;
        this.control = control;
        this.onQuit = onQuit;
    }
    Painter(): Painter {
        return Paint.Picture(
            IMG.PAUSE.background, SZ.PAUSE.BACKGROUND_X, SZ.PAUSE.BACKGROUND_Y,
            SZ.PAUSE.BACKGROUND_W, SZ.PAUSE.BACKGROUND_H)
            .Then(this.resume.Painter())
            .Then(this.restart.Painter())
            .Then(this.mainMenu.Painter());
    }
    Buttons(): MouseEventDispatcher {
        this.resume = new AnimatedButton(
            new RectBound(
                SZ.PAUSE.BUTTON_X, SZ.PAUSE.RESUME_Y,
                SZ.PAUSE.BUTTON_W, SZ.PAUSE.BUTTON_H),
            IMG.PAUSE.resume, IMG.PAUSE.resumeFocus, () => this.Resume());
        this.restart = new AnimatedButton(
            new RectBound(
                SZ.PAUSE.BUTTON_X, SZ.PAUSE.RESTART_Y,
                SZ.PAUSE.BUTTON_W, SZ.PAUSE.BUTTON_H),
            IMG.BTN.restart, IMG.BTN.restartFocus, () => this.Restart());
        this.mainMenu = new AnimatedButton(
            new RectBound(
                SZ.PAUSE.BUTTON_X, SZ.PAUSE.MAINMENU_Y,
                SZ.PAUSE.BUTTON_W, SZ.PAUSE.BUTTON_H),
            IMG.BTN.mainMenu, IMG.BTN.mainMenuFocus, () => this.MainMenu());
        return Button.Add(this.resume, this.restart, this.mainMenu);
    }
    Resume(): void {
        this.control.PopLayer();
        this.game.Start();
    }
    Restart(): void {
        this.control.PopLayer();
        this.onQuit();
        this.restartCallback();
    }
    MainMenu(): void {
        this.onQuit();
        for (; this.control.LayerSize() !== 1;) {
            this.control.PopLayer();
        }
    }
    game: GameLayer;
    resume: AnimatedButton<RectBound>;
    restart: AnimatedButton<RectBound>;
    mainMenu: AnimatedButton<RectBound>;
    onQuit: () => void;
    restartCallback: () => void;
}