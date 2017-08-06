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
}
