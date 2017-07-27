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
        snake: Nematode, lose: () => void) {
        super(timeGain / spu, 1 / spu,
            { whenEmpty: lose, whenChange: () => this.ResizeSnake() });
        this.snake = snake;
        this.progress = initTime / spu;
        this.bpu = spu / spb;
    }
    private ResizeSnake(): void {
        let lengthShouldBe = Math.floor(this.bpu * this.progress) + 1 /* head */;
        if (lengthShouldBe > this.snake.Length()) {
            for (; this.snake.Length() < lengthShouldBe;) this.snake.Grow();
        } else {
            for (; this.snake.Length() > lengthShouldBe;) this.snake.Grow();
        }
    }
    snake: Nematode;
    timeGain: number;
    bpu: number;
}

class VisionBar extends SimpleConfiguredBar {
    constructor(incRate: number, decRate: number, board: Board) {
        super(incRate, decRate, {
            whenChange: (now, change) => {
                this.AdjustBrightness();
                this.board.vision = now;
            }});
        this.board = board;
    }
    AdjustBrightness(): void {
        // TODO
    }
    board: Board;
}

class VictoryBar extends SimpleConfiguredBar {
    constructor(
        incRate: number, decRate: number, win: () => void) {
        super(incRate, decRate, { whenFull: win });
    }
}

class BarBarBar {
    constructor(eb: EnergyBar, vsb: VisionBar, vcb: VictoryBar) {
        this.energy = eb;
        this.vision = vsb;
        this.victory = vcb;
    }

    Painter(): Painter {
        return Paint.Noop();
    }

    Decrement(): void {
        this.energy.decrement();
        this.victory.decrement();
        this.vision.decrement();
    }
    Increment(c: food.Color | null) {
        switch (c) {
            case food.Color.GREEN:
                this.victory.increment();
                break;
            case food.Color.YELLOW:
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