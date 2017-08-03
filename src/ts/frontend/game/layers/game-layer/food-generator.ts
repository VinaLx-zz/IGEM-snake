/// <reference path="./food-adder.ts" />
/// <reference path="./level.ts" />
/// <reference path="./snake-game-state.ts" />


interface FoodGenerator {
    Generate(time: number, layer: SnakeGameState): FoodAdder;
}

abstract class IntervalGenerator implements FoodGenerator {
    constructor(interval: number) {
        this.interval = interval;
    }
    Generate(time: number, layer: SnakeGameState): FoodAdder {
        const tag = Math.floor(time / this.interval);
        if (tag === this.prevTag) return Adder.None;
        this.prevTag = tag;
        return this.GenerateImpl(time, layer);
    }
    abstract GenerateImpl(time: number, layer: SnakeGameState): FoodAdder;
    interval: number;
    prevTag: number = -1;
}

class LeveledGenerator extends IntervalGenerator {
    constructor(level: Level, width: number, height: number) {
        super(LeveledGenerator.RefreshRate(level));
        this.partGen = Random.Nat(4);
        this.colorGen = Random.Nat(3);
        this.posGen = Random.Map2(
            Random.NonNeg(width), Random.NonNeg(height),
            (a, b) => new Vector(a, b));
        this.addPartGen = this.MakePartGen();
        this.addEnergyGen = this.MakeEnergyGen();
    }
    private static RefreshRate(l: Level): number {
        switch (l) {
            case Level.Easy: return 3000;
            case Level.Normal: return 2700;
            case Level.Hard: return 2400;
        }
    }
    GenerateImpl(time: number, layer: SnakeGameState): FoodAdder {
        const max_food = 50;
        if (this.count >= max_food) {
            return Adder.None;
        }
        return this.GetRandomGen(layer).gen();
    }
    private GetRandomGen(state: SnakeGameState): RandGen<FoodAdder> {
        const nextGen = this.NextGen(state);
        const restGen = this.addPartGen;
        const energyGen = this.addEnergyGen;
        return Random.WeightedGen(
            [nextGen, 0.5], [restGen, 0.2], [energyGen, 0.3]);
    }
    private NextGen(state: SnakeGameState): RandGen<FoodAdder> {
        return this.posGen.Bind(v =>
            this.colorGen.Map(c => {
                const nextFood = state.NextFood(c);
                if (nextFood === null)
                    throw "LeveledGenerator: NextFood: No Food!?"
                return Adder.Part(c, nextFood, v, () => --this.count)
            }));
    }
    private MakeEnergyGen(): RandGen<FoodAdder> {
        return this.posGen.Map(v => Adder.Energy(v, () => --this.count));
    }
    private MakePartGen(): RandGen<FoodAdder> {
        return this.posGen.Bind(v =>
            this.partGen.Bind(p =>
                this.colorGen.Map(c =>
                    Adder.Part(c, p, v, () => --this.count))));
    }
    partGen: RandGen<number>;
    colorGen: RandGen<number>;
    posGen: RandGen<Vector>;
    addPartGen: RandGen<FoodAdder>;
    addEnergyGen: RandGen<FoodAdder>;
    count: number = 0;
}
