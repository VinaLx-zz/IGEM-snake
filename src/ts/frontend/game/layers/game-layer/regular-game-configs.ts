/// <reference path="./game-config.ts" />
/// <reference path="./food-machine.ts" />
/// <reference path="./food-library.ts" />
/// <reference path="./level.ts" />

class RegularTargetGenerator extends GameSequenceGenerator {
    constructor(
        level: Level,
        victory: VictoryBar,
        vision: VisionBar,
        acceleration: AccelerationBar) {
        super(victory, vision, acceleration);
        this.seqGen = RegularTargetGenerator.SequenceGen(
            foodLibrary.LevelLibrary(level));
    }
    Generate(color: food.Color): TargetSequence {
        return super.MakeSequence(color, this.seqGen.gen());
    }
    private static SequenceGen(library: food.Part[][]): RandGen<food.Part[]> {
        return Random.OneOf(library);
    }
    seqGen: RandGen<food.Part[]>;

}

class EasyConfig extends DefaultConfig {
    constructor() {
        super();
        this.ENERGY_TIME_GAIN = 8;
        this.TARGET_DEC_PER_FRAME = 0;
        this.TARGET_GAIN = 25;
    }
    TargetGenerator(state: SnakeGameState): TargetGenerator {
        return new RegularTargetGenerator(
            Level.Easy,
            state.VictoryBar(), state.VisionBar(), state.AccelerationBar());
    }
}

class NormalConfig extends DefaultConfig {
    constructor() {
        super();
        this.ENERGY_TIME_GAIN = 5;
        this.TARGET_DEC_PER_FRAME = 0;
        this.TARGET_GAIN = 25;
    }
    TargetGenerator(state: SnakeGameState): TargetGenerator {
        return new RegularTargetGenerator(
            Level.Normal,
            state.VictoryBar(), state.VisionBar(), state.AccelerationBar());
    }
}

class HardConfig extends DefaultConfig {
    constructor() {
        super();
        this.ENERGY_TIME_GAIN = 4;
        this.TARGET_DEC_PER_FRAME = 0.00001;
        this.TARGET_GAIN = 20;
    }
    TargetGenerator(state: SnakeGameState): TargetGenerator {
        return new RegularTargetGenerator(
            Level.Hard,
            state.VictoryBar(), state.VisionBar(), state.AccelerationBar());
    }
}