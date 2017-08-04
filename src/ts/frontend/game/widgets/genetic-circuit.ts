/// <reference path="./food.ts" />
/// <reference path="./bar-bar-bar.ts" />
/// <reference path="./acceleration-bar.ts" />
/// <reference path="../layers/game-layer/food-machine.ts" />

class GeneticCircuits extends ColorFoodMachine {
    constructor(targetGen: TargetGenerator, emptyStart: Boolean = false) {
        super(emptyStart ?
            machine.EmptyDispatcher() :
            machine.InitAllColor(targetGen), targetGen);
    }
    Painter(): Painter {
        const x = SZ.GAME.TARGET_BEG_X;
        return Paint.Picture(
            IMG.GAME.geneticCircuits,
            SZ.GAME.TARGET_X, SZ.GAME.TARGET_Y,
            SZ.GAME.TARGET_W, SZ.GAME.TARGET_H)
            .Then(Paint.Delay(() =>
                this.PaintCandidates(food.Color.YELLOW, x, SZ.GAME.YELLOW_BEG_Y)
                    .Then(this.PaintCandidates(
                        food.Color.GREEN, x, SZ.GAME.GREEN_BEG_Y)
                        .Then(this.PaintCandidates(
                            food.Color.RED, x, SZ.GAME.RED_BEG_Y)))));
    }
    Next(color: food.Color): food.Part | null {
        return this.dispatcher[color].Next();
    }
    Rest(color: food.Color): food.Part[] {
        return this.dispatcher[color].Rest();
    }
    private PaintCandidates(
        color: food.Color, begX: number, begY: number): Painter {
        let result = Paint.Noop();
        let x = begX + SZ.GAME.TARGET_X, y = begY + SZ.GAME.TARGET_Y;
        const seq = this.Rest(color);
        for (let i = 0; i < 5 && i < seq.length; ++i) {
            result = result.Then(Paint.Picture(
                foodTable[color][seq[i]], x, y,
                SZ.GAME.TARGET_CAND_W, SZ.GAME.TARGET_CAND_H));
            x += SZ.GAME.TARGET_CAND_OFFSET;
        }
        return result;
    }
}