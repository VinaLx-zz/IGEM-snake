/// <reference path="./abstract-layer.ts" />

class PauseLayer extends AbstractLayer {
    constructor(restart: () => void, game: GameLayer, control: LayerControl) {
        super(control, {});
        this.restart = restart;
        this.game = game;
        this.control = control;
    }
    Painter(): Painter {
        return Paint.Noop();
    }
    Buttons(): MouseEventDispatcher {
        return Button.Noop();
    }
    Resume(): void {
        this.control.PopLayer();
        this.game.Start();
    }
    Restart(): void {
        this.control.PopLayer(); // itself
        this.control.PopLayer(); // the game
        this.restart();
    }
    MainMenu(): void {
        for (; this.control.LayerSize() !== 1;) {
            this.control.PopLayer();
        }
    }
    game: GameLayer;
    restart: () => void;
}