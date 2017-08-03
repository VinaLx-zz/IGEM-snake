/// <reference path="./progress-bar.ts" />
/// <reference path="../parameters.ts" />

class AccelerationBar extends SimpleConfiguredBar {
    constructor(
        timeInit: number, timeGain: number,
        totalTime: number, snake: Nematode) {
        super(
            timeGain / totalTime * 100,
            100 / totalTime / param.FRAME_PER_SEC,
            { whenEmpty: () => this.snake.SlowDown() });
        this.snake = snake;
        this.progress = timeInit / totalTime * 100;
    }
    decrement(): void {
        if (this.snake.accelerating) {
            super.decrement();
        }
    }
    Accelerate(): void {
        if (this.progress !== 0) this.snake.Accelerate();
    }
    SlowDown(): void {
        this.snake.SlowDown();
    }
    snake: Nematode;
}