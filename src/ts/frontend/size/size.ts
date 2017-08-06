namespace SZ {
    export const WIDTH_FACTOR: number = 4;
    export const HEIGHT_FACTOR: number = 3;
    export const RELATIVE_HEIGHT: number = HEIGHT_FACTOR / WIDTH_FACTOR;

    export const BACK_X: number = 0.90;
    export const BACK_Y: number = 0.71;
    export const BACK_W: number = 0.075;
    export const BACK_H: number = 0.02;

    export namespace START {
        export const BUTTON_X: number = 0.875;
        export const BUTTON_R: number = 0.051875;
        export const PLAY_Y: number = 0.25;
        export const HELP_Y: number = 0.5;
    }

    export namespace SETTING {
        export const LAYER_X: number = 0.14;
        export const LAYER_Y: number = 0.1;
        export const LAYER_W: number = 0.72;
        export const LAYER_H: number = 0.55;
    }
    export namespace MODE {
        export const MODE_W: number = 0.1925;
        export const MODE_H: number = 0.095625;
        export const MODE_X: number = 0.5 - MODE_W / 2;
        export const EASY_Y: number = 0.2396875;
        export const NORMAL_Y: number = EASY_Y + 0.105;
        export const HARD_Y: number = NORMAL_Y + 0.105;
    }
    export namespace HELP {
        export const TEXT_H: number = 0.0225;
        export const STORY_X: number = 0.39;
        export const STORY_Y: number = 0.306;
        export const STORY_W: number = 0.22;
        export const PLAY_X: number = 0.38;
        export const PLAY_Y: number = 0.376;
        export const PLAY_W: number = 0.2475;
        export const LEARN_X: number = 0.25;
        export const LEARN_Y: number = 0.446;
        export const LEARN_W: number = 0.5;
    }
    export namespace BIOLOGY {
        export const PREV_X: number = 0.2275;
        export const PREV_X2: number = 0.2025;
        export const NEXT_X: number = 0.60875;
        export const NEXT_X2: number = 0.58375;
        export const BUTTON_Y: number = 0.344375;
        export const BUTTON_Y2: number = 0.36;
        export const BUTTON_W: number = 0.026875;
        export const BUTTON_H: number = 0.03;
    }
    export namespace STORY {
        export const PREV_X: number = 0.181818182;
        export const NEXT_X: number = 0.85;
        export const BUTTON_Y: number = 0.6;
        export const BUTTON_W: number = BIOLOGY.BUTTON_W;
        export const BUTTON_H: number = BIOLOGY.BUTTON_H;
    }
    export namespace GAME {
        export const SNAKE_HEAD_R: number = 0.02125;
        export const SNAKE_BODY_R: number = SNAKE_HEAD_R;
        export const SNAKE_BODY_DIST: number = 0.03125;
        export const ENERGY_R: number = 0.009375;
        export const PART_H: number = 0.01875;
        export const PART_W: number = 0.0225;

        export const ROCKER_R: number = 0.08;
        export const ROCKER_Y: number = 0.64;
        export const ROCKER_DOT_R: number = 0.032;
        export const LEFT_ROCKER_X: number = 0.1125;
        export const RIGHT_ROCKER_X: number = 1 - LEFT_ROCKER_X;
        export const ACCELERATION_R: number = 0.051;
        export const ACCELERATION_Y: number = 0.65;
        export const RIGHT_ACCELERATION_X: number = 0.90625;
        export const LEFT_ACCELERATION_X: number = 1 - RIGHT_ACCELERATION_X;
        export const PAUSE_X: number = 0.88625;
        export const PAUSE_Y: number = 0.51;
        export const PAUSE_W: number = 0.04
        export const PAUSE_H: number = 0.0425;

        export const TARGET_X: number = 0.7625;
        export const TARGET_Y: number = 0.0325;
        export const TARGET_W: number = 0.225;
        export const TARGET_H: number = 0.1975;
        export const PROGRESS_X: number = 0.04875;
        export const PROGRESS_Y: number = 0.046875;
        export const PROGRESS_W: number = 0.1525;
        export const PROGRESS_H: number = 0.16875;

        export const PROGRESS_INNER_W: number = 0.02;
        export const PROGRESS_INNER_H: number = 0.12;
        // x, y is the coordinate of origin at the bottom of the tubes
        // relative to the whole progress image
        export const PROGRESS_INNER_ORIGIN_Y: number = 0.133125;
        export const YELLOW_X: number = 0.016875;
        export const GREEN_X: number = 0.07125;
        export const BLUE_X: number = 0.125625;

        export const TARGET_CAND_W: number = PART_W;
        export const TARGET_CAND_H: number = PART_H;
        export const TARGET_BEG_X: number = 0.0625;
        export const YELLOW_BEG_Y: number = 0.0709375;
        export const GREEN_BEG_Y: number = 0.1103125;
        export const RED_BEG_Y: number = 0.1496875;
        export const TARGET_CAND_OFFSET: number = 0.00625 + TARGET_CAND_W;
    }
    export namespace PAUSE {
        export const BACKGROUND_W: number = 0.35625;
        export const BACKGROUND_H: number = 0.3725;
        export const BACKGROUND_X: number = 0.5 - BACKGROUND_W / 2;
        export const BACKGROUND_Y: number = (RELATIVE_HEIGHT - BACKGROUND_H) / 2;
        export const BUTTON_W: number = 0.193125;
        export const BUTTON_H: number = 0.09375;
        export const BUTTON_X: number = 0.5 - BUTTON_W / 2;
        export const RESTART_Y: number = (RELATIVE_HEIGHT - BUTTON_H) / 2;
        export const RESUME_Y: number = RESTART_Y - 0.1;
        export const MAINMENU_Y: number = RESTART_Y + 0.1;
    }
}
