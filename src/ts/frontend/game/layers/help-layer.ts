/// <reference path="./abstract-layer.ts" />
/// <reference path="./story-layer.ts" />
/// <reference path="./biology-layer.ts" />
/// <reference path="../widgets/close-button.ts" />
/// <reference path="./tutorial-layer.ts" />

class HelpLayer extends AbstractLayer {
    constructor(control: LayerControl) {
        super(control, {});
        this.storyLayer = new StoryLayer(control);
        this.biologyLayer = new BiologyLayer(control);
    }
    Buttons(): MouseEventCatcher {
        this.back = new CloseButton(
            new RectBound(
                SZ.BACK_X, SZ.BACK_Y, SZ.BACK_W, SZ.BACK_H), this.control);
        const th = SZ.HELP.TEXT_H;
        this.story = new AnimatedButton(
            new RectBound(
                SZ.HELP.STORY_X, SZ.HELP.STORY_Y, SZ.HELP.STORY_W, th),
                IMG.BTN.tellStory, IMG.BTN.tellStoryFocus,
                (): void => this.control.PushLayer(this.storyLayer))
        this.how2play = new AnimatedButton(
            new RectBound(
                SZ.HELP.PLAY_X, SZ.HELP.PLAY_Y, SZ.HELP.PLAY_W, th),
                IMG.BTN.how2play, IMG.BTN.how2playFocus,
                () => Tutorial.Start(this.control));
        this.learn = new AnimatedButton(
            new RectBound(
                SZ.HELP.LEARN_X, SZ.HELP.LEARN_Y, SZ.HELP.LEARN_W, th),
                IMG.BTN.learnBio, IMG.BTN.learnBioFocus,
                (): void => this.control.PushLayer(this.biologyLayer))
        return Button.Add(this.back, this.story, this.how2play, this.learn);
    }
    Painter(): Painter {
        return Paint.Background(IMG.BG.help)
            .Then(Paint.PositionedImage(this.back.bound, IMG.BTN.back))
            .Then(this.story.Painter())
            .Then(this.how2play.Painter())
            .Then(this.learn.Painter());
    }
    back: CloseButton<RectBound>;
    story: AnimatedButton<RectBound>;
    how2play: AnimatedButton<RectBound>;
    learn: AnimatedButton<RectBound>;

    storyLayer: Layer;
    biologyLayer: Layer;
}
