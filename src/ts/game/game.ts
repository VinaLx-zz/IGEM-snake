/// <reference path="./game-control/game-status.ts" />
/// <reference path="./game-control/layer-control.ts" />
/// <reference path="./game-control/layer.ts" />

class Game {
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas; // just in case
        this.context = <CanvasRenderingContext2D>canvas.getContext("2d");
        this.gameStatus = new GameStatus(canvas.width, canvas.height);
        this.layerControl = new LayerControlImpl([], this.gameStatus);
        this.DispatchAllEvents();
    }
    private DrawAll(time: number): void {
        // draw layers from bottom to top
        this.layers.forEach(layer => layer.Draw(this.context, time));
    }

    // dispatch all events to layer(s)
    private DispatchAllEvents(): void {
        // TODO
        window.ontouchmove = e => e.preventDefault();
        window.ontouchstart = e => e.preventDefault();
        window.onclick = e => e.preventDefault();
        window.onkeypress = e => e.preventDefault();
        window.onkeydown = e => e.preventDefault();
    }

    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    layers: Layer[];
    gameStatus: GameStatus;
    layerControl: LayerControl;
}
