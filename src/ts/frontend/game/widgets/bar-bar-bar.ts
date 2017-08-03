/// <reference path="./food.ts" />
/// <reference path="./progress-bar.ts" />
/// <reference path="./snake.ts" />
/// <reference path="./board.ts" />

class EnergyBar extends SimpleConfiguredBar {
    /**
     * @param spu Seconds Per (progress bar) Unit
     * @param timeGain seconds gain by each food
     * @param spb Seconds Per (snake) Body
     */
    constructor(
        initTime: number, spu: number, timeGain: number, spb: number,
        snake: Nematode) {
        super(timeGain / spu, 1 / spu / param.FRAME_PER_SEC,
            { whenChange: () => this.ResizeSnake() });
        this.snake = snake;
        this.progress = initTime / spu;
        this.bpu = spu / spb;
    }
    private ResizeSnake(): void {
        let lengthShouldBe = Math.floor(this.bpu * this.progress) + 1 /* head */;
        if (lengthShouldBe > this.snake.Length()) {
            for (; this.snake.Length() < lengthShouldBe;) this.snake.Grow();
        } else {
            for (; this.snake.Length() > lengthShouldBe;) this.snake.Shrink();
        }
    }
    snake: Nematode;
    timeGain: number;
    bpu: number;
}

class VisionBar extends SimpleConfiguredBar {
    constructor(
        basicVision: number, fullVision: number,
        visionGain: number, visionDecPerSec: number, board: Board) {
        super(0, 0, {
            whenChange: now =>
                this.board.vision = this.basicVision + now * this.visionPerUnit
        });
        this.board = board;
        this.board.vision = basicVision;
        this.visionPerUnit = (fullVision - basicVision) / 100
        this.basicVision = basicVision;
        this.fullVision = fullVision;
        this.incRate = visionGain / this.visionPerUnit;
        this.decRate =
            visionDecPerSec / this.visionPerUnit / param.FRAME_PER_SEC;
    }
    Progress(): number {
        return (this.visionPerUnit * this.progress + this.basicVision)
            / this.fullVision * 100;
    }
    visionPerUnit: number;
    basicVision: number;
    fullVision: number;
    board: Board;
}

class VictoryBar extends SimpleConfiguredBar {
    constructor(
        victoryGain: number, victoryDecPerSec: number, snake: Nematode) {
        super(victoryGain, victoryDecPerSec / param.FRAME_PER_SEC, {
            whenChange: () => this.AdjustBrightness()
        });
        this.snake = snake;
    }
    AdjustBrightness(): void {
        this.snake.bright = this.progress >= 90;
    }
    snake: Nematode;
}

class BarBarBar {
    constructor(eb: EnergyBar, vsb: VisionBar, vcb: VictoryBar) {
        this.energy = eb;
        this.vision = vsb;
        this.victory = vcb;
    }

    Painter(): Painter {
        const y = SZ.GAME.PROGRESS_INNER_ORIGIN_Y;
        return Paint.Picture(
            IMG.GAME.progressBars,
            SZ.GAME.PROGRESS_X, SZ.GAME.PROGRESS_Y,
            SZ.GAME.PROGRESS_W, SZ.GAME.PROGRESS_H)
            .Then(Paint.Delay(() =>
                BarBarBar.PaintProgress(
                    "#E9CA33", SZ.GAME.YELLOW_X, y, this.victory.progress)
                    .Then(BarBarBar.PaintProgress(
                        "#0E874E", SZ.GAME.GREEN_X, y, this.vision.Progress())
                        .Then(BarBarBar.PaintProgress(
                            "#1F80AA", SZ.GAME.BLUE_X, y, this.energy.progress)))));
    }

    private static PaintProgress(
        color: string, rx: number, ry: number, progress: number): Painter {
        const r = SZ.GAME.PROGRESS_INNER_W / 2;
        const ox = rx + SZ.GAME.PROGRESS_X, oy = ry + SZ.GAME.PROGRESS_Y;
        const x = ox - r, y = oy - SZ.GAME.PROGRESS_INNER_H;
        const totalHeight = SZ.GAME.PROGRESS_INNER_H + r;
        const resHeight = totalHeight * progress / 100;
        return Paint.ArcFill(color, ox, oy, r, 0, Math.PI)
            .Then(Paint.Rect(
                color, x, y,
                SZ.GAME.PROGRESS_INNER_W, SZ.GAME.PROGRESS_INNER_H))
            .ClipRect(x, y + totalHeight - resHeight, 2 * r, resHeight);
    }


    Decrement(): void {
        this.energy.decrement();
        this.victory.decrement();
        this.vision.decrement();
    }
    Increment(c: food.Color | null) {
        switch (c) {
            case food.Color.YELLOW:
                this.victory.increment();
                break;
            case food.Color.GREEN:
                this.vision.increment();
                break;
            case null:
                this.energy.increment();
                break;
            default:
                throw "red food shouldn't goes here";
        }
    }

    energy: EnergyBar;
    vision: VisionBar;
    victory: VictoryBar;
}