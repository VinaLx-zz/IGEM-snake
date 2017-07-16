/// <reference path="./../game-control/layer.ts" />
/// <reference path="./../game-control/layer-control.ts" />
/// <reference path="./../game-control/game-status.ts" />

class SecondLayer implements Layer {
    constructor(control: LayerControl) {
        this.control = control
        this.eventDispatcher = new EventDispatcherImpl({
            MouseUp: () => this.control.PopLayer()
        })
    }
    Draw(ctx: CanvasRenderingContext2D, time: number) {
        ctx.fillStyle = "white";
        ctx.fillRect(100, 100, 500, 500);
    }
    eventDispatcher: EventDispatcher;
    control: LayerControl;
}

class StartLayer implements Layer {
    constructor(control: LayerControl) {
        this.control = control;
        this.secondLayer = new SecondLayer(this.control);
        this.eventDispatcher = new EventDispatcherImpl({
            MouseUp: () => this.control.PushLayer(this.secondLayer)
        })
    }
    Draw(ctx: CanvasRenderingContext2D, time: number) {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0,
            this.control.gameStatus.canvasWidth,
            this.control.gameStatus.canvasHeight)
    }
    secondLayer: Layer;
    color: string = "black";
    eventDispatcher: EventDispatcher;
    control: LayerControl;
}