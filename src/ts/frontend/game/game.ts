/// <reference path="./game-control/game-status.ts" />
/// <reference path="./game-control/layer-control.ts" />
/// <reference path="./game-control/layer.ts" />

class Game {
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas; // just in case
        this.context = <CanvasRenderingContext2D>canvas.getContext("2d");
        this.gameStatus = new GameStatus(canvas.width, canvas.height);
        this.DispatchAllEvents();
        this.layers = []
        this.layerControl = new LayerControlImpl(this.layers, this.gameStatus);
        this.layerControl.PushLayer(new StartLayer(this.layerControl));
    }
    private DrawAll(time: number): void {
        // draw layers from bottom to top
        this.layers.forEach(layer => layer.Draw(this.context, time));
    }

    // dispatch all events to layer(s)
    private DispatchAllEvents(): void {
        // TODO
        this.DispatchTouchEvent();
        this.DispathMouseEvent();
    }
    private DispatchTouchEvent(): void {
        const forEachTouch = (e: TouchEvent, f: (t: Touch) => void) => {
            for (let i = 0; i < e.touches.length; ++i)  f(e.touches[i]);
        }
        this.canvas.ontouchmove = (e: TouchEvent) => {
            e.preventDefault();
            forEachTouch(e, t =>
                this.TopLayer().eventDispatcher.MouseMove(
                    new Vector(t.clientX, t.clientY)))
        };
        this.canvas.ontouchstart = (e: TouchEvent) => {
            e.preventDefault();
            forEachTouch(e, t =>
                this.TopLayer().eventDispatcher.MouseDown(
                    new Vector(t.clientX, t.clientY)))
        };
        this.canvas.ontouchcancel = (e: TouchEvent) => {
            e.preventDefault();
            forEachTouch(e, t =>
                this.TopLayer().eventDispatcher.MouseUp(
                    new Vector(t.clientX, t.clientY)))
        }
        this.canvas.ontouchend = (e: TouchEvent) => {
            e.preventDefault();
            forEachTouch(e, t =>
                this.TopLayer().eventDispatcher.MouseUp(
                    new Vector(t.clientX, t.clientY)))
        }
    }
    private DispathMouseEvent(): void {
        this.canvas.onmousemove = (e: MouseEvent) => {
            // triggered only when holding hthe primary button
            if (!(e.buttons & 1)) return;
            this.TopLayer().eventDispatcher.MouseMove(
                new Vector(e.clientX, e.clientY));
        }
        this.canvas.onmousedown = (e: MouseEvent) => {
            this.TopLayer().eventDispatcher.MouseDown(
                new Vector(e.clientX, e.clientY));
        }
        this.canvas.onmouseup = (e: MouseEvent) => {
            this.TopLayer().eventDispatcher.MouseUp(
                new Vector(e.clientX, e.clientY));
        }
    }
    private DispatchKeyboardEvent(): void {
        this.canvas.onkeydown = (e: KeyboardEvent) => {
            this.TopLayer().eventDispatcher.KeyDown(e.keyCode);
        }
        this.canvas.onkeypress = (e: KeyboardEvent) => {
            this.TopLayer().eventDispatcher.KeyPress(e.keyCode);
        }
        this.canvas.onkeyup = (e: KeyboardEvent) => {
            this.TopLayer().eventDispatcher.KeyUp(e.keyCode);
        }
    }

    private TopLayer(): Layer {
        return this.layers[this.layers.length - 1];
    }

    public Start(): void {
        const callback = (time: number) => {
            this.DrawAll(time);
            window.requestAnimationFrame(callback);
        }
        window.requestAnimationFrame(callback);
        // TODO
    }

    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    layers: Layer[];
    gameStatus: GameStatus;
    layerControl: LayerControl;
}

$(function () {
    const canvas = <HTMLCanvasElement>$("#canvas")[0];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const game = new Game(canvas);
    game.Start();
})