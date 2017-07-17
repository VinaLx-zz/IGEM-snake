/// <reference path="../game-control/layer.ts" />
/// <reference path="../game-control/event-dispatcher.ts" />
/// <reference path="../game-control/game-status.ts" />
/// <reference path="../game-control/layer-control.ts" />
/// <reference path="../widgets/painter.ts" />

abstract class AbstractLayer  {
    constructor(control: LayerControl, option: EventDispatchOption) {
        this.control = control;
        this.eventDispatcher = new EventDispatcherImpl(option);
        this.painter = this.Painter();
    }

    Draw(ctx: CanvasRenderingContext2D, time: number): void {
        this.painter.Paint(ctx, time);
    }

    abstract Painter(): Painter;

    control: LayerControl;
    eventDispatcher: EventDispatcher;
    painter: Painter;
}