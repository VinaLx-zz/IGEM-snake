declare namespace SZ {
    const WIDTH_FACTOR: number;
    const HEIGHT_FACTOR: number;
    const RELATIVE_HEIGHT: number;

    const BACK_X: number;
    const BACK_Y: number;
    const BACK_W: number;
    const BACK_H: number;

    namespace START {
        const BUTTON_X: number;
        const BUTTON_R: number;
        const PLAY_Y: number;
        const HELP_Y: number;
    }
    namespace SETTING {
        const LAYER_X: number;
        const LAYER_Y: number;
        const LAYER_W: number;
        const LAYER_H: number;
    }
    namespace MODE {
        const MODE_W: number;
        const MODE_H: number;
        const MODE_X: number;
        const EASY_Y: number;
        const NORMAL_Y: number;
        const HARD_Y: number;
    }
    namespace HELP {
        const TEXT_H: number;
        const STORY_X: number;
        const STORY_Y: number;
        const STORY_W: number;
        const PLAY_X: number;
        const PLAY_Y: number;
        const PLAY_W: number;
        const LEARN_X: number;
        const LEARN_Y: number;
        const LEARN_W: number;
    }
    namespace STORY {
        const PREV_X: number;
        const NEXT_X: number;
        const BUTTON_Y: number;
        const BUTTON_W: number;
        const BUTTON_H: number;
        const CONTINUE_X: number;
        const CONTINUE_Y: number;
    }
    namespace BIOLOGY {
        const PREV_X: number;
        const PREV_X2: number;
        const NEXT_X: number;
        const NEXT_X2: number;
        const BUTTON_Y: number;
        const BUTTON_Y2: number;
        const BUTTON_W: number;
        const BUTTON_H: number;
    }
    namespace GAME {
        const SNAKE_HEAD_R: number;
        const SNAKE_BODY_R: number;
        const SNAKE_BODY_DIST: number;
        const ENERGY_R: number;
        const PART_H: number;
        const PART_W: number;

        const ROCKER_R: number;
        const ROCKER_Y: number;
        const ROCKER_DOT_R: number;
        const LEFT_ROCKER_X: number;
        const RIGHT_ROCKER_X: number;
        const ACCELERATION_R: number;
        const ACCELERATION_Y: number;
        const LEFT_ACCELERATION_X: number;
        const RIGHT_ACCELERATION_X: number;
        const PAUSE_X: number;
        const PAUSE_Y: number;
        const PAUSE_W: number;
        const PAUSE_H: number;

        const TARGET_X: number;
        const TARGET_Y: number;
        const TARGET_W: number;
        const TARGET_H: number;
        const PROGRESS_X: number;
        const PROGRESS_Y: number;
        const PROGRESS_W: number;
        const PROGRESS_H: number;
        const PROGRESS_INNER_W: number;
        const PROGRESS_INNER_H: number;
        // x, y is the coordinate of origin at the bottom of the tubes
        // relative to the whole progress image
        const PROGRESS_INNER_ORIGIN_Y: number;
        const GREEN_X: number;
        const YELLOW_X: number;
        const BLUE_X: number;

        const TARGET_CAND_W: number;
        const TARGET_CAND_H: number;
        const TARGET_BEG_X: number;
        const YELLOW_BEG_Y: number;
        const GREEN_BEG_Y: number;
        const RED_BEG_Y: number;
        const TARGET_CAND_OFFSET: number;
    }
    namespace PAUSE {
        const BACKGROUND_W: number;
        const BACKGROUND_H: number;
        const BACKGROUND_X: number;
        const BACKGROUND_Y: number;
        const BUTTON_W: number;
        const BUTTON_H: number;
        const BUTTON_X: number;
        const RESUME_Y: number;
        const RESTART_Y: number;
        const MAINMENU_Y: number;
    }
    namespace GAMEOVER {
        const BACKGROUND_W: number;
        const BACKGROUND_H: number;
        const BACKGROUND_X: number;
        const BACKGROUND_Y: number;
        const BUTTON_W: number;
        const BUTTON_H: number;
        const BUTTON_X: number;
        const RESTART_Y: number;
        const MAINMENU_Y: number;
        const SHARE_Y: number;
        const LEARN_X: number;
        const LEARN_Y: number;
        const LEARN_W: number;
        const LEARN_H: number;
        const FONT_SIZE: number;
        // const TIME_X: number;
        // const TIME_Y: number;
        // const PART_X: number;
        // const PART_Y: number;
    }
    namespace TUTORIAL {
        const START_W: number;
        const START_H: number;
        const START_X: number;
        const START_Y: number;
        const MOVE_W: number;
        const MOVE_H: number;
        const MOVE_X: number;
        const MOVE_Y: number;
        const ENERGY_X: number;
        const ENERGY_Y: number;
        const ENERGY_W: number;
        const ENERGY_H: number;
        const ENERGY_POST_X: number;
        const ENERGY_POST_Y: number;
        const ENERGY_POST_W: number;
        const ENERGY_POST_H: number;
        const ENERGY_POST2_X: number;
        const ENERGY_POST2_Y: number;
        const ENERGY_POST2_W: number;
        const ENERGY_POST2_H: number;
        const GENETIC_CIRCUIT_W: number;
        const GENETIC_CIRCUIT_H: number;
        const GENETIC_CIRCUIT_X: number;
        const GENETIC_CIRCUIT_Y: number;
        const GENETIC_CIRCUIT2_W: number;
        const GENETIC_CIRCUIT2_H: number;
        const GENETIC_CIRCUIT2_X: number;
        const GENETIC_CIRCUIT2_Y: number;
        const RED_X: number;
        const RED_Y: number;
        const RED_W: number;
        const RED_H: number;
        const RED_POST_X: number;
        const RED_POST_Y: number;
        const RED_POST_W: number;
        const RED_POST_H: number;
        const GREEN_X: number;
        const GREEN_Y: number;
        const GREEN_W: number;
        const GREEN_H: number;
        const GREEN_POST_X: number;
        const GREEN_POST_Y: number;
        const GREEN_POST_W: number;
        const GREEN_POST_H: number;
        const YELLOW_X: number;
        const YELLOW_Y: number;
        const YELLOW_W: number;
        const YELLOW_H: number;
        const YELLOW_POST_X: number;
        const YELLOW_POST_Y: number;
        const YELLOW_POST_W: number;
        const YELLOW_POST_H: number;
        const END_X: number;
        const END_Y: number;
        const END_W: number;
        const END_H: number;
        const CONTINUE_X: number;
        const CONTINUE_Y: number;
        const CONTINUE_W: number;
        const CONTINUE_H: number;
    }
}
