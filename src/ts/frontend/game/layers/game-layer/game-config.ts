/// <reference path="../../parameters.ts" />
/// <reference path="./snake-game-state.ts" />


interface GameConfig {
    BOARD_WIDTH: number;
    BOARD_HEIGHT: number;

    // speed measured by points between body
    SNAKE_NORMAL_SPEED: number;
    SNAKE_ACCELERATED_SPEED: number;
    SNAKE_INIT_LENGTH: number;
    SNAKE_INIT_POS: Vector;
    SECONDS_PER_SNAKE_BODY: number;

    // time increase in second of each energy food
    ENERGY_TIME_GAIN: number;
    // time in second of each unit of time progress bar represents (total 100)
    LIFE_TIME_PER_UNIT: number;
    LIFE_TIME_INIT: number;

    ACCELERATE_TIME_INIT: number;
    ACCELERATE_TIME_GAIN: number;
    ACCELERATE_TIME_PER_UNIT: number;

    BASIC_VISION: number;
    VISION_DEC_PER_FRAME: number;
    VISION_GAIN: number;

    TARGET_DEC_PER_FRAME: number;
    TARGET_GAIN: number;

    TargetGenerator(state: SnakeGameState): TargetGenerator;
    Win(state: SnakeGameState): Boolean;
    Lose(state: SnakeGameState): Boolean;
}

class DefaultConfig implements GameConfig {
    BOARD_WIDTH: number = 1;
    BOARD_HEIGHT: number = SZ.HEIGHT_FACTOR / SZ.WIDTH_FACTOR;

    // speed measured by points between body
    SNAKE_NORMAL_SPEED: number = 4;
    SNAKE_ACCELERATED_SPEED: number = 8;
    SNAKE_INIT_LENGTH: number = 10;
    SNAKE_INIT_POS: Vector = new Vector(
        this.BOARD_HEIGHT / 2, this.BOARD_WIDTH / 2);
    SECONDS_PER_SNAKE_BODY: number = 10;

    // time increase in second of each energy food
    ENERGY_TIME_GAIN: number = 5;
    // time in second of each unit of time progress bar represents (total 100)
    LIFE_TIME_PER_UNIT: number = 1;
    LIFE_TIME_INIT: number = 100;

    ACCELERATE_TIME_INIT: number = 0;
    ACCELERATE_TIME_GAIN: number = 2;
    ACCELERATE_TIME_PER_UNIT: number = 0.1;

    BASIC_VISION: number = 0.2;
    VISION_DEC_PER_FRAME: number = 0.1;
    VISION_GAIN: number = 20;

    TARGET_DEC_PER_FRAME: number = 0.03;
    TARGET_GAIN: number = 30;

    TargetGenerator(state: SnakeGameState): TargetGenerator {
        return machine.noopGenerator;
    }
    Win(state: SnakeGameState): Boolean { return false; }
    Lose(state: SnakeGameState): Boolean { return false; }
}