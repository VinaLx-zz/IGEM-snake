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
        this.easyGen = RegularTargetGenerator.SequenceGen(
            foodLibrary.LevelLibrary(Level.Easy));
        this.victoryGen =
            level === Level.Easy ? this.easyGen :
                RegularTargetGenerator.SequenceGen(
                    foodLibrary.LevelLibrary(level));

    }
    Generate(color: food.Color): TargetSequence {
        if (color === food.Color.YELLOW) {
            return super.MakeSequence(color, this.victoryGen.gen());
        }
        return super.MakeSequence(color, this.easyGen.gen());
    }
    private static SequenceGen(library: food.Part[][]): RandGen<food.Part[]> {
        return Random.OneOf(library);
    }
    easyGen: RandGen<food.Part[]>;
    victoryGen: RandGen<food.Part[]>;
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
        this.ENERGY_TIME_GAIN = 10;
        this.TARGET_DEC_PER_SEC = 0;
        this.TARGET_GAIN = 25;
    }
}

class NormalConfig extends LeveledConfig {
    constructor() {
        super(Level.Normal);
        this.ENERGY_TIME_GAIN = 8;
        this.TARGET_DEC_PER_SEC = 0;
        this.TARGET_GAIN = 25;
    }
}

class HardConfig extends LeveledConfig {
    constructor() {
        super(Level.Hard);
        this.ENERGY_TIME_GAIN = 6;
        this.TARGET_DEC_PER_SEC = 0;
        this.TARGET_GAIN = 25;
    }
}