/// <reference path="../../game-control/layer.ts" />

interface GameLayer extends Layer {
    Pause(): void;
    Start(): void;
    State(): SnakeGameState;
}

interface GameFinishCallback {
    (g: GameLayer, c: LayerControl): void;
}