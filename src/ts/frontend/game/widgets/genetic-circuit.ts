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
        return Paint.Picture(
            IMG.GAME.geneticCircuits,
            SZ.GAME.TARGET_X, SZ.GAME.TARGET_Y,
            SZ.GAME.TARGET_W, SZ.GAME.TARGET_H);
    }
}