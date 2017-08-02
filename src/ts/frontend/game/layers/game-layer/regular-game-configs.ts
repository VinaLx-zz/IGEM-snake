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

class LeveledConfig extends DefaultConfig {
    constructor(level: Level) {
        super();
        this.level = level;
    }
    TargetGenerator(state: SnakeGameState): TargetGenerator {
        return new RegularTargetGenerator(
            this.level,
            state.VictoryBar(), state.VisionBar(), state.AccelerationBar());
    }
    Win(state: SnakeGameState): Boolean {
        return state.VictoryBar().progress >= 100;
    }
    Lose(state: SnakeGameState): Boolean {
        return state.EnergyBar().progress <= 0;
    }
    level: Level;
}

class EasyConfig extends LeveledConfig {
    constructor() {
        super(Level.Easy);
        this.ENERGY_TIME_GAIN = 8;
        this.TARGET_DEC_PER_FRAME = 0;
        this.TARGET_GAIN = 25;
    }
}

class NormalConfig extends LeveledConfig {
    constructor() {
        super(Level.Normal);
        this.ENERGY_TIME_GAIN = 5;
        this.TARGET_DEC_PER_FRAME = 0;
        this.TARGET_GAIN = 25;
    }
}

class HardConfig extends LeveledConfig {
    constructor() {
        super(Level.Hard);
        this.ENERGY_TIME_GAIN = 4;
        this.TARGET_DEC_PER_FRAME = 0.00001;
        this.TARGET_GAIN = 20;
    }
}