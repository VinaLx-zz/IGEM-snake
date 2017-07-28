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
    private PaintCandidates(
        color: food.Color, begX: number, begY: number): Painter {
        let result = Paint.Noop();
        let x = begX + SZ.GAME.TARGET_X, y = begY + SZ.GAME.TARGET_Y;
        const target = this.dispatcher[color];
        const seq = target.sequence;
        for (let i = target.current;
                i < target.current + 5 && i < seq.length; ++i) {
            result = result.Then(Paint.Picture(
                foodTable[color][seq[i]], x, y,
                SZ.GAME.TARGET_CAND_W, SZ.GAME.TARGET_CAND_H));
            x += SZ.GAME.TARGET_CAND_OFFSET;
        }
        return result;
    }
}