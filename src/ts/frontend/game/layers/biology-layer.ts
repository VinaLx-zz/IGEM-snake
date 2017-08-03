/// <reference path="./abstract-layer.ts" />
/// <reference path="../widgets/close-button.ts" />
/// <reference path="../widgets/slides.ts" />

class BiologyLayer extends AbstractLayer {
    constructor(control: LayerControl) {
        super(control, {}, true);
        this.slide = new Slides(IMG.BIOLOGY.page);
        this.Init(); // Init from super
    }
    Buttons(): MouseEventCatcher {
        this.back = new CloseButton(
            new RectBound(
                SZ.BACK_X, SZ.BACK_Y, SZ.BACK_W, SZ.BACK_H), this.control);
        this.next = new ClickButton(
            () => this.slide.Next(),
            new CircleBound(SZ.BIOLOGY.NEXT_X, SZ.BIOLOGY.BUTTON_Y, SZ.BIOLOGY.BUTTON_W / 2));
        this.prev = new ClickButton(
            () => this.slide.Prev(),
            new CircleBound(SZ.BIOLOGY.PREV_X, SZ.BIOLOGY.BUTTON_Y, SZ.BIOLOGY.BUTTON_W / 2));
        return Button.Add(this.back, this.next, this.prev);
    }
    Painter(): Painter {
        return this.slide.Painter()
            .Then(Paint.PositionedImage(this.back.bound, IMG.BTN.back))
            .Then(this.PaintNextButton())
            .Then(this.PaintPrevButton());
    }

    PaintNextButton(): Painter {
        return Paint.PositionedImage(this.next.bound, IMG.BIOLOGY.next);
    }

    PaintPrevButton(): Painter {
        return Paint.PositionedImage(this.prev.bound, IMG.BIOLOGY.prev);
    }

    back: CloseButton<RectBound>;
    next: ClickButton<CircleBound>;
    prev: ClickButton<CircleBound>;

    slide: Slides;
}
