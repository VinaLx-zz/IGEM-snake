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
        this.next = new AnimatedButton(
            new RectBound(
                SZ.BIOLOGY.NEXT_X, SZ.BIOLOGY.BUTTON_Y,
                SZ.BIOLOGY.BUTTON_W, SZ.BIOLOGY.BUTTON_H),
            IMG.BIOLOGY.next, IMG.BIOLOGY.nextFocus,
            () => {
                this.slide.Next();
                this.AdjustButtonPosition();
            });
        this.prev = new AnimatedButton(
            new RectBound(
                SZ.BIOLOGY.PREV_X, SZ.BIOLOGY.BUTTON_Y,
                SZ.BIOLOGY.BUTTON_W, SZ.BIOLOGY.BUTTON_W),
            IMG.BIOLOGY.prev, IMG.BIOLOGY.prevFocus,
            () => {
                this.slide.Prev();
                this.AdjustButtonPosition();
            });
        return Button.Add(this.back, this.next, this.prev);
    }
    Painter(): Painter {
        return this.slide.Painter()
            .Then(Paint.PositionedImage(this.back.bound, IMG.BTN.back))
            .Then(this.PaintNextButton())
            .Then(this.PaintPrevButton());
    }
    private AdjustButtonPosition(): void {
        const current = this.slide.current, max = this.slide.images.length - 1;
        const pb = this.prev.bound, nb = this.next.bound;
        if (current === 0) {
            nb.topLeft = new Vector(SZ.BIOLOGY.NEXT_X2, SZ.BIOLOGY.BUTTON_Y2);
        } else if (current === max) {
            pb.topLeft = new Vector(SZ.BIOLOGY.PREV_X2, SZ.BIOLOGY.PREV_X2);
        } else {
            nb.topLeft = new Vector(SZ.BIOLOGY.NEXT_X, SZ.BIOLOGY.BUTTON_Y);
            pb.topLeft = new Vector(SZ.BIOLOGY.PREV_X, SZ.BIOLOGY.BUTTON_Y2);
        }
    }

    PaintNextButton(): Painter {
        return Paint.If(
            () => this.slide.current === this.slide.images.length - 1,
            Paint.Noop(), this.next.Painter())
    }

    PaintPrevButton(): Painter {
        return Paint.If(
            () => this.slide.current === 0,
            Paint.Noop(), this.prev.Painter());
    }

    back: CloseButton<RectBound>;
    next: AnimatedButton<RectBound>;
    prev: AnimatedButton<RectBound>;

    slide: Slides;
}
