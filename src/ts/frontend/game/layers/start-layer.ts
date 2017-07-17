/// <reference path="./abstract-layer.ts" />
/// <reference path="../widgets/button.ts" />

class SecondLayer extends AbstractLayer {
    constructor(control: LayerControl, color: () => string) {
        super(control, {})
        this.color = color;
    }

    Painter(): Painter {
        return Paint.Rect("green", 100, 100, 500, 500)
            .Then(Paint.Delay(
                () => Paint.Rect(this.color(), 550, 100, 50, 50)));
    }
    Buttons(): MouseEventCatcher {
        return new ClickButton(
            () => this.control.PopLayer(), new RectBound(550, 100, 50, 50));
    }
    color: () => string;
    buttons: MouseEventCatcher;
}

class StartLayer extends AbstractLayer {
    constructor(control: LayerControl) {
        super(control, {});
        this.secondLayer = new SecondLayer(this.control, () => this.color);
    }

    Painter(): Painter {
        const width = this.control.gameStatus.canvasWidth;
        const height = this.control.gameStatus.canvasHeight;
        return Paint.Rect("white", 0, 0, width, height)
            .Then(Paint.Rect("blue", 100, 100, 100, 100))
            .Then(Paint.Rect("red", 300, 100, 100, 100))
            .Then(Paint.Delay(
                () => Paint.Rect(this.color, 0, height / 2, width, height)));
    }
    Buttons(): MouseEventCatcher {
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
        return Button.Add(blue, red, blackButton, otherButton);
    }

    secondLayer: SecondLayer;
    color: string = "black";
    eventDispatcher: EventDispatcher;
    control: LayerControl;
}