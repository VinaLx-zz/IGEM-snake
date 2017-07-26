namespace param {
    // number of frame fresh every second
    export const FRAME_PER_SEC: number = 30;

    // points between two adjacent bodies
    export const POINTS_BETWEEN_BODY: number = 30;
    export const DIST_BETWEEN_POINTS: number =
        SZ.GAME.SNAKE_BODY_DIST / POINTS_BETWEEN_BODY;
}