/// <reference path="./abstract-layer.ts" />
/// <reference path="../widgets/close-button.ts" />

class HelpLayer extends AbstractLayer {
    constructor(control: LayerControl) {
        super(control, {});
    }
    Buttons(): MouseEventCatcher {
        this.back = new CloseButton(
            new RectBound(
                SZ.BACK_X, SZ.BACK_Y, SZ.BACK_W, SZ.BACK_H), this.control);
        const th = SZ.HELP.TEXT_H;
        this.story = new ClickButton(
            Func.Noop, new RectBound(
                SZ.HELP.STORY_X, SZ.HELP.STORY_Y, SZ.HELP.STORY_W, th))
        this.how2play = new ClickButton(
            Func.Noop, new RectBound(
                SZ.HELP.PLAY_X, SZ.HELP.PLAY_Y, SZ.HELP.PLAY_W, th))
        this.learn = new ClickButton(
            Func.Noop, new RectBound(
                SZ.HELP.LEARN_X, SZ.HELP.LEARN_Y, SZ.HELP.LEARN_W, th))
        return Button.Add(this.back, this.story, this.how2play, this.learn);
    }
    Painter(): Painter {
        return Paint.Background(IMG.BG.help)
            .Then(Paint.PositionedImage(this.back.bound, IMG.BTN.back))
            .Then(Paint.PositionedImage(this.story.bound, IMG.BTN.tellStory))
            .Then(Paint.PositionedImage(this.how2play.bound, IMG.BTN.how2play))
            .Then(Paint.PositionedImage(this.learn.bound, IMG.BTN.learnBio));
    }
    back: CloseButton<RectBound>;
    story: ClickButton<RectBound>;
    how2play: ClickButton<RectBound>;
    learn: ClickButton<RectBound>;
}