/// <reference path="./abstract-layer.ts" />
/// <reference path="../widgets/close-button.ts" />
/// <reference path="../widgets/story-slides.ts" />

class StoryLayer extends AbstractLayer {
    constructor(control: LayerControl) {
        super(control, {}, true);
        this.slide = new StorySlides(IMG.STORY.page);
        this.Init(); // Init from super
    }
    Buttons(): MouseEventCatcher {
        this.back = new CloseButton(
            new RectBound(
                SZ.BACK_X, SZ.BACK_Y, SZ.BACK_W, SZ.BACK_H), this.control);
        this.next = new ClickButton(
            () => this.slide.Next(),
            new CircleBound(SZ.STORY.NEXT_X, SZ.STORY.BUTTON_Y, SZ.STORY.BUTTON_R));
        this.prev = new ClickButton(
            () => this.slide.Prev(),
            new CircleBound(SZ.STORY.PREV_X, SZ.STORY.BUTTON_Y, SZ.STORY.BUTTON_R));
        return Button.Add(this.back, this.next, this.prev);
    }
    Painter(): Painter {
        return this.slide.Painter()
            .Then(Paint.PositionedImage(this.back.bound, IMG.BTN.back))
            .Then(this.PaintNextButton())
            .Then(this.PaintPrevButton());
    }

    PaintNextButton(): Painter {
        return Paint.PositionedImage(this.next.bound, IMG.STORY.next);
    }

    PaintPrevButton(): Painter {
        return Paint.PositionedImage(this.prev.bound, IMG.STORY.prev);
    }

    back: CloseButton<RectBound>;
    next: ClickButton<CircleBound>;
    prev: ClickButton<CircleBound>;

    slide: StorySlides;
}
