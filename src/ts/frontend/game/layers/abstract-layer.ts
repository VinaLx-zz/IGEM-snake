/// <reference path="../game-control/layer.ts" />
/// <reference path="../game-control/event-dispatcher.ts" />
/// <reference path="../game-control/game-status.ts" />
/// <reference path="../game-control/layer-control.ts" />
/// <reference path="../widgets/painter.ts" />
/// <reference path="../widgets/button.ts" />

abstract class AbstractLayer  {
    constructor(control: LayerControl, option: EventDispatchOption) {
        this.control = control;
        this.painter = this.Painter();
        this.buttons = this.Buttons();
        const dispatcher = new EventDispatcherImpl(option);
        dispatcher.OnMouseDown(p => this.buttons.MouseDown(p));
        dispatcher.OnMouseUp(p => this.buttons.MouseUp(p));
        dispatcher.OnMouseMove(p => this.buttons.MouseMove(p));
        this.eventDispatcher = dispatcher;
    }

    Draw(ctx: CanvasRenderingContext2D, time: number): void {
        this.painter.Paint(ctx, time);
    }

    abstract Painter(): Painter;
    abstract Buttons(): MouseEventCatcher;

    buttons: MouseEventCatcher;
    control: LayerControl;
    eventDispatcher: EventDispatcher;
    painter: Painter;
}