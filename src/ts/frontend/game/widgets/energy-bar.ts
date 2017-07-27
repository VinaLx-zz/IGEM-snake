/// <reference path="./progress-bar.ts" />
/// <reference path="./snake.ts" />

class EnergyBar extends SimpleConfiguredBar {
    /**
     * @param spu Seconds Per (progress bar) Unit
     * @param timeGain seconds gain by each food
     * @param spb Seconds Per (snake) Body
     */
    constructor(
        init: number, spu: number, timeGain: number, spb: number,
        snake: Nematode, lose: () => void) {
        super(timeGain / spu, 1 / spu,
            { whenEmpty: lose, whenChange: () => this.ResizeSnake() });
        this.snake = snake;
        this.progress = init;
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