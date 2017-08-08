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
    export namespace GAMEOVER {
        export const BACKGROUND_W: number = 0.606875;
        export const BACKGROUND_H: number = 0.43625;
        export const BACKGROUND_X: number = (1 - BACKGROUND_W) / 2;
        export const BACKGROUND_Y: number = (RELATIVE_HEIGHT - BACKGROUND_H) / 2;
        export const BUTTON_W: number = PAUSE.BUTTON_W;
        export const BUTTON_H: number = PAUSE.BUTTON_H;
        export const BUTTON_Y: number = BACKGROUND_Y + 0.3;
        export const RESTART_X: number = 0.46 - BUTTON_W;
        export const MAINMENU_X: number = 0.54;
        export const LEARN_W: number = 0.281875;
        export const LEARN_H: number = 0.016875;
        export const LEARN_X: number = (1 - LEARN_W) / 2;
        export const LEARN_Y: number = BACKGROUND_Y + BACKGROUND_H + 0.019;
        export const FONT_SIZE: number = 0.03;
        export const TIME_X: number = 0.35 + BACKGROUND_X;
        export const TIME_Y: number = 0.1625 + BACKGROUND_Y;
        export const PART_X: number = TIME_X;
        export const PART_Y: number = 0.21875 + BACKGROUND_Y;
    }
    export namespace TUTORIAL {
        export const START_W: number = 0.57;
        export const START_H: number = 0.10875;
        export const START_X: number = 0.5 - START_W / 2;
        export const START_Y: number = (RELATIVE_HEIGHT - START_H) / 2;
        export const MOVE_W: number = 0.43875;
        export const MOVE_H: number = 0.16625;
        export const MOVE_X: number = 0.030625;
        export const MOVE_Y: number = 0.323125;
        export const ENERGY_W: number = 0.57;
        export const ENERGY_H: number = 0.18;
        export const ENERGY_X: number = 0.5 - ENERGY_W / 2;
        export const ENERGY_Y: number = 0.11625;
        export const ENERGY_POST_W: number = 0.44125;
        export const ENERGY_POST_H: number = 0.1225;
        export const ENERGY_POST_X: number = 0.2162875;
        export const ENERGY_POST_Y: number = 0.079375;
        export const ENERGY_POST2_W: number = 0.4425;
        export const ENERGY_POST2_H: number = 0.14375;
        export const ENERGY_POST2_X: number = 0.21625;
        export const ENERGY_POST2_Y: number = 0.06875;
        export const GENETIC_CIRCUIT_W: number = 0.4425;
        export const GENETIC_CIRCUIT_H: number = 0.121875;
        export const GENETIC_CIRCUIT_X: number = 0.31;
        export const GENETIC_CIRCUIT_Y: number = 0.079375;
        export const GENETIC_CIRCUIT2_W: number = 0.4425;
        export const GENETIC_CIRCUIT2_H: number = 0.17875;
        export const GENETIC_CIRCUIT2_X: number = 0.31;
        export const GENETIC_CIRCUIT2_Y: number = 0.048125;
        export const RED_X: number = 0.31;
        export const RED_Y: number = 0.12625;
        export const RED_W: number = 0.4425;
        export const RED_H: number = 0.121875;
        export const RED_POST_W: number = 0.42875;
        export const RED_POST_H: number = 0.16625;
        export const RED_POST_X: number = 0.540625;
        export const RED_POST_Y: number = 0.32;
        export const GREEN_W: number = 0.439375;
        export const GREEN_H: number = 0.15375;
        export const GREEN_X: number = 0.311875;
        export const GREEN_Y: number = 0.048125;
        export const GREEN_POST_W: number = 0.41875;
        export const GREEN_POST_H: number = 0.151875;
        export const GREEN_POST_X: number = 0.290625;
        export const GREEN_POST_Y: number = 0.049375;
        export const YELLOW_X: number = 0.31;
        export const YELLOW_Y: number = 0.091875;
        export const YELLOW_W: number = 0.4425;
        export const YELLOW_H: number = 0.10375;
        export const YELLOW_POST_W: number = 0.5;
        export const YELLOW_POST_H: number = 0.183125;
        export const YELLOW_POST_X: number = 0.228125;
        export const YELLOW_POST_Y: number = 0.04625;
        export const END_X: number = 0.228125;
        export const END_Y: number = 0.095625;
        export const END_W: number = 0.41875;
        export const END_H: number = 0.103125;
        export const CONTINUE_W: number = 0.249375;
        export const CONTINUE_H: number = 0.0175;
        export const CONTINUE_X: number = 0.5 - CONTINUE_W / 2;
        export const CONTINUE_Y: number = 0.59375;
    }
}
