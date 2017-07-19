namespace param {
    // points between two adjacent bodies
    export const POINTS_BETWEEN_BODY: number = 45;
    export const DIST_BETWEEN_POINTS: number =
        SZ.GAME.SNAKE_BODY_DIST / POINTS_BETWEEN_BODY;

    // speed measured by points between body
    export const SNAKE_NORMAL_SPEED: number = 3;
    export const SNAKE_ACCELERATED_SPEED: number = 4;

    // time increase in second of each energy food
    export const ENERGY_TIME_GAIN: number = 1;
    // time in second of each unit of time progress bar represents (total 100)
    export const TIME_PER_UNIT: number = 1;
}