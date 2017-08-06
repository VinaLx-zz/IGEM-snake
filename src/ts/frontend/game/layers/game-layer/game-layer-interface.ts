/// <reference path="../../game-control/layer.ts" />

interface GameLayer extends Layer {
    Pause(): void;
    Start(): void;
    State(): SnakeGameState;
    Restart(): void;
    GameTime(): number;
}

interface GameFinishCallback {
    (g: GameLayer, c: LayerControl, win: Boolean): void;
}