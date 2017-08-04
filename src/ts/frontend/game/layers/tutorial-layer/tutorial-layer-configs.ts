/// <reference path="../game-layer/game-config.ts" />
/// <reference path="./tutorial-food-gen.ts" />

class TutorialConfigs extends DefaultConfig {
    constructor(control: LayerControl, foodGen: TutorialFoodGenerator) {
        super();
        this.TARGET_GAIN = 50;
        this.ENERGY_TIME_GAIN = 10;
        this.VISION_GAIN = 0.05;
        this.EMPTY_CIRCUIT_START = true;
        this.ACCELERATE_TIME_INIT = 0;
        this.BASIC_VISION = 0.3;
        this.control = control;
        this.foodGen = foodGen;
    }
    TargetGenerator(state: SnakeGameState): TargetGenerator {
        return new TutorialTargetGenerator(
            state.VictoryBar(), state.VisionBar(), state.AccelerationBar(),
            this.foodGen, this.control);
    }
    control: LayerControl;
    foodGen: TutorialFoodGenerator;
}