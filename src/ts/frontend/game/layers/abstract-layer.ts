/// <reference path="../game-control/layer.ts" />
/// <reference path="../game-control/event-dispatcher.ts" />
/// <reference path="../game-control/game-status.ts" />
/// <reference path="../game-control/layer-control.ts" />

abstract class AbstractLayer  {
    constructor(control: LayerControl, option: EventDispatchOption) {
        this.control = control;
        this.eventDispatcher = new EventDispatcherImpl(option);
    }

    abstract Draw(ctx: CanvasRenderingContext2D, time: number): void;

    control: LayerControl;
    eventDispatcher: EventDispatcher;
}