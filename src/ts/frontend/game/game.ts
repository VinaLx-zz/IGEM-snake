/// <reference path="./game-control/game-status.ts" />
/// <reference path="./game-control/layer-control.ts" />
/// <reference path="./game-control/layer.ts" />

class Game {
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = Game.OrientCanvasSize(canvas);
        this.context = <CanvasRenderingContext2D>canvas.getContext("2d");
        this.gameStatus = new GameStatus();
        this.DispatchAllEvents();
        this.layers = []
        this.layerControl = new LayerControlImpl(this.layers, this.gameStatus);
        this.layerControl.PushLayer(new StartLayer(this.layerControl));
    }
    private DrawAll(time: number): void {
        // draw layers from bottom to top
        this.Painter().Paint(this.context, time);
    }
    private Painter(): Painter {
        let p = Paint.Noop();
        for (const layer of this.layers) {
            p = p.Then(layer.Painter());
        }
        return p.Scale(this.canvas.width, this.canvas.width);
    }
    static OrientCanvasSize(canvas: HTMLCanvasElement): HTMLCanvasElement {
        const wh = window.innerHeight, ww = window.innerWidth, wh_ww = wh / ww;
        canvas.height = wh;
        canvas.width = ww;
        const h_w = SZ.HEIGHT_FACTOR / SZ.WIDTH_FACTOR;
        if (h_w > wh_ww) {
            canvas.width = wh / h_w;
        } else {
            canvas.height = ww * h_w;
        }
        return canvas;
    }

    private Translate(x: number, y: number): Vector {
        const cpos = $(this.canvas).position();
        return new Vector(
            (x - cpos.left) / this.canvas.width,
            (y - cpos.top) / this.canvas.width);
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
                    this.Translate(t.clientX, t.clientY)))
        };
        this.canvas.ontouchstart = (e: TouchEvent) => {
            e.preventDefault();
            forEachTouch(e, t =>
                this.TopLayer().eventDispatcher.MouseDown(
                    this.Translate(t.clientX, t.clientY)))
        };
        this.canvas.ontouchcancel = (e: TouchEvent) => {
            e.preventDefault();
            forEachTouch(e, t =>
                this.TopLayer().eventDispatcher.MouseUp(
                    this.Translate(t.clientX, t.clientY)))
        }
        this.canvas.ontouchend = (e: TouchEvent) => {
            e.preventDefault();
            forEachTouch(e, t =>
                this.TopLayer().eventDispatcher.MouseUp(
                    this.Translate(t.clientX, t.clientY)))
        }
    }
    private DispathMouseEvent(): void {
        this.canvas.onmousemove = (e: MouseEvent) => {
            // triggered only when holding hthe primary button
            if (!(e.buttons & 1)) return;
            this.TopLayer().eventDispatcher.MouseMove(
                this.Translate(e.clientX, e.clientY));
        }
        this.canvas.onmousedown = (e: MouseEvent) => {
            this.TopLayer().eventDispatcher.MouseDown(
                this.Translate(e.clientX, e.clientY));
        }
        this.canvas.onmouseup = (e: MouseEvent) => {
            this.TopLayer().eventDispatcher.MouseUp(
                this.Translate(e.clientX, e.clientY));
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
    const game = new Game(canvas);
    game.Start();
})