/// <reference path="../parameters.ts" />

class GameParam {
    BOARD_WIDTH: number = 1;
    BOARD_HEIGHT: number = SZ.HEIGHT_FACTOR / SZ.WIDTH_FACTOR;

    // speed measured by points between body
    SNAKE_NORMAL_SPEED: number = 4;
    SNAKE_ACCELERATED_SPEED: number = 8;
    SNAKE_INIT_LENGTH: number = 10;

    // time increase in second of each energy food
    ENERGY_TIME_GAIN: number = 10;
    // time in second of each unit of time progress bar represents (total 100)
    LIFE_TIME_PER_UNIT: number = 1;
    LIFE_TIME_INIT: number = 100;

    ACCELERATE_TIME_INIT: number = 0;
    ACCELERATE_TIME_GAIN: number = 1;
    ACCELERATE_TIME_PER_UNIT: number = 0.1;

    VISION_INIT: number = 100;
    VISION_DEC_PER_FRAME: number = 0;
    VISION_GAIN: number = 0;

    TARGET_DEC_PER_FRAME: number = 0;
    TARGET_GAIN: number = 0;
}

namespace gameParam {
    export function Default(): GameParam {
        return new GameParam();
    }
    export function Custom(other: Partial<GameParam>): GameParam {
        let result = Default();
        Func.Assign(result, other);
        return result;
    }
}