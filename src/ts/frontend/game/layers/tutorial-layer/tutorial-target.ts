/// <reference path="../game-layer/food-machine.ts" />
/// <reference path="./tutorial-page.ts" />


class TutorialTargetGenerator extends GameSequenceGenerator {
    constructor(
        victory: VictoryBar,
        vision: VisionBar,
        acceleration: AccelerationBar,
        foodGen: TutorialFoodGenerator,
        control: LayerControl) {
        super(victory, vision, acceleration);
        this.control = control;
        this.foodGen = foodGen;
        this.InitTargets();
    }
    Generate(color: food.Color): TargetSequence {
        if (this.current < this.colorSeq.length) {
            this.foodGen.StartTutorial(this.colorSeq[this.current]);
            return this.targets[this.current++];
        }
        return machine.noopTarget;
    }
    private MakeTutorialTarget(
        color: food.Color, promptPage: TutorialPage): TargetSequence {
        return this.MakeSequence(
            color,
            [food.Part.PROM, food.Part.RBS, food.Part.CDS, food.Part.TERM],
            () => {
                this.GameLayer().Pause();
                this.control.PushLayer(promptPage)
            });
    }
    private InitTargets() {
        this.targets = [
            this.MakeTutorialTarget(food.Color.RED, this.RedAndGreen()),
            this.MakeTutorialTarget(food.Color.GREEN, this.GreenAndYellow()),
            this.MakeTutorialTarget(food.Color.YELLOW, this.AfterYellow()),
            this.MakeSequence(
                food.Color.YELLOW,
                [food.Part.PROM, food.Part.RBS, food.Part.CDS, food.Part.TERM])];
    }
    private RedAndGreen(): TutorialPage {
        return this.MakeTutorialPage(
            Paint.Picture(
                IMG.TUTORIAL.redPost,
                SZ.TUTORIAL.RED_POST_X, SZ.TUTORIAL.RED_POST_Y,
                SZ.TUTORIAL.RED_POST_W, SZ.TUTORIAL.RED_POST_H),
            Paint.Picture(
                IMG.TUTORIAL.green,
                SZ.TUTORIAL.GREEN_X, SZ.TUTORIAL.GREEN_Y,
                SZ.TUTORIAL.GREEN_W, SZ.TUTORIAL.GREEN_H));
    }
    private GreenAndYellow(): TutorialPage {
        return this.MakeTutorialPage(
            Paint.Picture(
                IMG.TUTORIAL.greenPost,
                SZ.TUTORIAL.GREEN_POST_X, SZ.TUTORIAL.GREEN_POST_Y,
                SZ.TUTORIAL.GREEN_POST_W, SZ.TUTORIAL.GREEN_POST_H),
            Paint.Picture(
                IMG.TUTORIAL.yellow,
                SZ.TUTORIAL.YELLOW_X, SZ.TUTORIAL.YELLOW_Y,
                SZ.TUTORIAL.YELLOW_W, SZ.TUTORIAL.YELLOW_H));
    }
    private AfterYellow(): TutorialPage {
        return this.MakeTutorialPage(
            Paint.Picture(
                IMG.TUTORIAL.yellowPost,
                SZ.TUTORIAL.YELLOW_POST_X, SZ.TUTORIAL.YELLOW_POST_Y,
                SZ.TUTORIAL.YELLOW_POST_W, SZ.TUTORIAL.YELLOW_POST_H),
            Paint.Picture(
                IMG.TUTORIAL.end,
                SZ.TUTORIAL.END_X, SZ.TUTORIAL.END_Y,
                SZ.TUTORIAL.END_W, SZ.TUTORIAL.END_H));
    }
    private GameLayer(): GameLayer {
        return <GameLayer>this.control.TopLayer();
    }
    private MakeTutorialPage(...ps: Painter[]): TutorialPage {
        return Tutorial.MakeTutorialPage(this.control, () => {
            this.GameLayer().Start();
        }, ...ps);
    }
    colorSeq: food.Color[] =
    [food.Color.RED, food.Color.GREEN,
    food.Color.YELLOW, food.Color.YELLOW];
    foodGen: TutorialFoodGenerator;
    targets: TargetSequence[];
    current: number = 0;
    control: LayerControl;
}