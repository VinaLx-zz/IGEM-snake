namespace param {
    // number of frame fresh every second
    export const FRAME_PER_SEC: number = 30;

    // points between two adjacent bodies
    export const POINTS_BETWEEN_BODY: number = 30;
    export const DIST_BETWEEN_POINTS: number =
        SZ.GAME.SNAKE_BODY_DIST / POINTS_BETWEEN_BODY;

    // speed measured by points between body
    export const SNAKE_NORMAL_SPEED: number = 4;
    export const SNAKE_ACCELERATED_SPEED: number = 8;

    // time increase in second of each energy food
    export const ENERGY_TIME_GAIN: number = 1;
    // time in second of each unit of time progress bar represents (total 100)
    export const LIFE_TIME_PER_UNIT: number = 1;
    export const ENERGY_LOSS_PER_FRAME: number =
        1 / LIFE_TIME_PER_UNIT / FRAME_PER_SEC;

    export const ACCELERATE_TIME_GAIN: number = 1;
    export const ACCELERATE_TIME_PER_UNIT: number = 0.1;
    export const ACCELERATE_LOSS_PER_FRAME: number =
        1 / ACCELERATE_TIME_PER_UNIT / FRAME_PER_SEC;
}