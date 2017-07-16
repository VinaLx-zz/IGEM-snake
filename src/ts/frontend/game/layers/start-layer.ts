/// <reference path="./abstract-layer.ts" />
/// <reference path="../widgets/button.ts" />

class SecondLayer extends AbstractLayer {
    constructor(control: LayerControl, color: () => string) {
        super(control, {
            MouseDown: p => this.buttons.MouseDown(p),
            MouseUp: p => this.buttons.MouseUp(p),
            MouseMove: p => this.buttons.MouseMove(p)
        })
        this.buttons = new ClickButton(
            () => this.control.PopLayer(), new RectBound(100, 550, 50, 50));
        this.color = color;
    }
    Draw(ctx: CanvasRenderingContext2D, time: number) {
        ctx.fillStyle = "green";
        ctx.fillRect(100, 100, 500, 500);
        ctx.fillStyle = this.color();
        ctx.fillRect(100, 550, 50, 50);
    }
    color: () => string;
    buttons: MouseEventCatcher;
}

class StartLayer extends AbstractLayer {
    constructor(control: LayerControl) {
        super(control, {
            MouseDown: p => this.buttons.MouseDown(p),
            MouseUp: p => this.buttons.MouseUp(p),
            MouseMove: p => this.buttons.MouseMove(p)
        });
        this.secondLayer = new SecondLayer(this.control, () => this.color);
        const blueBound = new RectBound(100, 100, 100, 100);
        const blue = new ClickButton(() => this.color = "blue", blueBound);
        const redBound = new RectBound(300, 100, 100, 100);
        const red = new ClickButton(() => this.color = "red", redBound);
        const width = this.control.gameStatus.canvasWidth;
        const height = this.control.gameStatus.canvasHeight;
        const blackBound = Bound.Sub(
            new RectBound(0, 0, width, height / 2), Bound.Add(blueBound, redBound));
        const blackButton = new ClickButton(() => this.color = "black", blackBound);
        const otherBound = new RectBound(0, height / 2, width, height);
        const otherButton = new ClickButton(
            () => this.control.PushLayer(this.secondLayer), otherBound);
        this.buttons = Button.Add(blue, red, blackButton, otherButton);
    }
    Draw(ctx: CanvasRenderingContext2D, time: number) {
        const width = this.control.gameStatus.canvasWidth;
        const height = this.control.gameStatus.canvasHeight;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "blue";
        ctx.fillRect(100, 100, 100, 100);
        ctx.fillStyle = "red";
        ctx.fillRect(300, 100, 100, 100);
        ctx.fillStyle = this.color;
        ctx.fillRect(0, height / 2, width, height)
    }
    secondLayer: SecondLayer;
    buttons: MouseEventCatcher;
    color: string = "black";
    eventDispatcher: EventDispatcher;
    control: LayerControl;
}