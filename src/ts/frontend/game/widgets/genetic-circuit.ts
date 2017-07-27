/// <reference path="./food.ts" />
/// <reference path="./bar-bar-bar.ts" />

class GeneticCircuits extends ColorfulFoodMachine {
    constructor(bbb: BarBarBar, ab: AccelerationOrb) {
        super(
            [food.Color.GREEN, () => bbb.Increment(food.Color.GREEN)],
            [food.Color.RED, () => ab.Increment()],
            [food.Color.YELLOW, () => bbb.Increment(food.Color.YELLOW)]);
    }
    Painter(): Painter {
        return Paint.Noop();
    }
}