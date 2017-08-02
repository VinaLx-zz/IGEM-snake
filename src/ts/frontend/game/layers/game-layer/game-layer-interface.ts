/// <reference path="../../game-control/layer.ts" />

interface GameLayer extends Layer {
    Pause(): void;
    Start(): void;
    State(): SnakeGameState;
}
