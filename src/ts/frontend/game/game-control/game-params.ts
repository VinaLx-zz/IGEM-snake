/// <reference path="../parameters.ts" />

class GameParam {
    BOARD_WIDTH: number = 1;
    BOARD_HEIGHT: number = SZ.HEIGHT_FACTOR / SZ.WIDTH_FACTOR;

    // speed measured by points between body
    SNAKE_NORMAL_SPEED: number = 4;
    SNAKE_ACCELERATED_SPEED: number = 8;

    // time increase in second of each energy food
    ENERGY_TIME_GAIN: number = 1;
    // time in second of each unit of time progress bar represents (total 100)
    LIFE_TIME_PER_UNIT: number = 1;

    get ENERGY_LOSS_PER_FRAME(): number {
        return 1 / this.LIFE_TIME_PER_UNIT / param.FRAME_PER_SEC;
    }

    ACCELERATE_TIME_GAIN: number = 1;
    ACCELERATE_TIME_PER_UNIT: number = 0.1;

    get ACCELERATE_CONSUME_PER_FRAME(): number {
        return 1 / this.ACCELERATE_TIME_PER_UNIT / param.FRAME_PER_SEC;
    }
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