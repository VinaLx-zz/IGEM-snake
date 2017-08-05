/// <reference path="./layer.ts" />

// layer controller interface
interface LayerControl {
    PushLayer(layer: Layer): void;
    PopLayer(): void;
    TopLayer(): Layer;
    LayerSize(): number;
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
    TopLayer(): Layer {
        return this.layers[this.layers.length - 1];
    }
    LayerSize(): number {
        return this.layers.length;
    }
    layers: Layer[];
    gs: GameStatus;
}