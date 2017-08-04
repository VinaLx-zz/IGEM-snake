/// <reference path="../game-layer/food-generator.ts" />

class TutorialFoodGenerator extends IntervalGenerator {
    constructor() {
        super(1000);
        this.posGen = FoodGen.PositionGen(1, SZ.RELATIVE_HEIGHT);
        this.blueGen = FoodGen.EnergyGen(
            this.posGen, () => --this.blueCount).Map(a => {
                ++this.blueCount;
                return a
            });
    }
    GenerateImpl(time: number, state: SnakeGameState): FoodAdder {
        if (this.currentColor === null) return Adder.None;
        const blueGen = this.BlueGen();
        const rest = state.RestFood(this.currentColor);
        for (const p of rest) {
            if (!this.exist[p])
                return Random.WeightedGen(
                    [this.PartGen(p), 0.8], [blueGen, 0.2]).gen();
        }
        return Adder.None;
    }
    private CanGenBlue(): Boolean {
        return this.blueCount < TutorialFoodGenerator.MAX_BLUE;
    }
    private BlueGen(): RandGen<FoodAdder> {
        return this.CanGenBlue() ? this.blueGen : Random.Const(Adder.None);
    }
    private PartGen(p: food.Part): RandGen<FoodAdder> {
        if (this.currentColor === null) return Random.Const(Adder.None);
        return FoodGen.PartGen(
            this.posGen, Random.Const(this.currentColor),
            Random.Const(p), () => this.exist[p] = false)
            .Map(a => { this.exist[p] = true; return a; });
    }
    StartTutorial(color: food.Color): void {
        this.exist = TutorialFoodGenerator.InitExist();
        this.currentColor = color;
    }
    private static InitExist(): Boolean[] {
        return [false, false, false, false];
    }
    exist: Boolean[] = TutorialFoodGenerator.InitExist();
    currentColor: food.Color | null = null;
    blueGen: RandGen<FoodAdder>;
    posGen: RandGen<Vector>;
    blueCount: number = 0;
    private static readonly MAX_BLUE = 3;
}