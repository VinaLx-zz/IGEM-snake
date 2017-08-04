/// <reference path="../game-layer/food-machine.ts" />
/// <reference path="./tutorial-page.ts" />


class TutorialTargetGenerator extends GameSequenceGenerator {
    constructor(
        victory: VictoryBar,
        vision: VisionBar,
        acceleration: AccelerationBar,
        control: LayerControl) {
        super(victory, vision, acceleration)
        this.control = control;
    }
    Generate(color: food.Color): TargetSequence {
        return machine.noopTarget;
    }
    private MakeTutorialTarget(
        color: food.Color, promptPage: TutorialPage): TargetSequence {
        return this.MakeSequence(
            color,
            [food.Part.PROM, food.Part.RBS, food.Part.CDS, food.Part.TERM],
            () => this.control.PushLayer(promptPage));
    }
    control: LayerControl;
}