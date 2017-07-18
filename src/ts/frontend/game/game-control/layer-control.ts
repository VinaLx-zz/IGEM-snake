/// <reference path="./layer.ts" />

// layer controller interface
interface LayerControl {
    PushLayer(layer: Layer): void;
    PopLayer(): void;
    gs: GameStatus;
}

class LayerControlImpl implements LayerControl {
    constructor(layers: Layer[], gameStatus: GameStatus) {
        this.layers = layers;
        this.gs = gameStatus;
    }
    PushLayer(layer: Layer): void {
        this.layers.push(layer);
    }
    PopLayer(): void {
        this.layers.pop();
    }
    layers: Layer[];
    gs: GameStatus;
}