/// <reference path="./progress-bar.ts" />
/// <reference path="../parameters.ts" />

class AccelerationBar extends SimpleConfiguredBar {
    constructor(timeGain: number, timePerUnit: number, snake: Nematode) {
        super(timeGain / timePerUnit, 1 / timePerUnit / param.FRAME_PER_SEC, {
            whenEmpty: () => this.snake.SlowDown()
        });
        this.snake = snake;
    }
    decrement(): void {
        if (this.snake.accelerating) {
            super.decrement();
        }
    }
    snake: Nematode;
}