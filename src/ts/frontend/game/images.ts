namespace IMG {
    function image(src: string): HTMLImageElement {
        const img = new Image(600, 600);
        img.src = src;
        return img;
    }
    export namespace BG {
        export const start = image("images/start/background.png");
        export const help = image("images/help/background.png");
        export const mode = image("images/mode/background.png");
    }
    export namespace STORY {
        export const page = [
            image("images/story/0.png"),
            image("images/story/1.png"),
            image("images/story/2.png"),
            image("images/story/3.png"),
            image("images/story/4.png")
        ];
        export const prev = image("images/story/prev.png");
        export const next = image("images/story/next.png");
    }
    export namespace BIOLOGY {
        export const page = [
            image("images/biology/0.png"),
            image("images/biology/1.png"),
            image("images/biology/2.png"),
            image("images/biology/3.png"),
            image("images/biology/4.png"),
            image("images/biology/5.png"),
            image("images/biology/6.png"),
            image("images/biology/7.png"),
            image("images/biology/8.png")
        ];
        export const prev = image("images/biology/prev.png");
        export const next = image("images/biology/next.png");
    }
    export namespace BTN {
        export const start = image("images/start/play-white.png");
        export const startFocus = image("images/start/play-gray.png");
        export const help = image("images/start/help-white.png");
        export const helpFocus = image("images/start/help-gray.png");
        export const back = image("images/help/back.png");
        export const easy = image("images/mode/easy.png");
        export const easyFocus = image("images/mode/easy-focus.png");
        export const normal = image("images/mode/normal.png");
        export const normalFocus = image("images/mode/normal-focus.png");
        export const hard = image("images/mode/hard.png");
        export const hardFocus = image("images/mode/hard-focus.png");
        export const tutorial = image("images/mode/tutorial.png");
        export const tellStory = image("images/help/tell-me-story.png");
        export const tellStoryFocus = image("images/help/tell-me-story-focus.png");
        export const how2play = image("images/help/how-to-play.png");
        export const how2playFocus = image("images/help/how-to-play-focus.png");
        export const learnBio = image("images/help/synthetic-bio.png");
        export const learnBioFocus = image("images/help/synthetic-bio-focus.png");
    }
    export namespace GAME {
        export const rockerBack = image("images/game/rocker-back.png");
        export const rockerDot = image("images/game/rocker-dot.png");
        export const acceleration = image("images/game/acceleration.png");
        export const progressBars = image("images/game/progress-bars.png");
        export const geneticCircuits = image("images/game/genetic-circuit.png");
        export const brownHead = image("images/game/brown-head.png");
        export const brownBody = image("images/game/brown-body.png");
        export const lightHead = image("images/game/light-head.png");
        export const lightBody = image("images/game/light-body.png");
    }
    export namespace FOOD {
        export const prom_r = image("images/food/prom-r.png");
        export const rbs_r = image("images/food/rbs-r.png");
        export const cds_r = image("images/food/cds-r.png");
        export const term_r = image("images/food/term-r.png");
        export const prom_g = image("images/food/prom-g.png");
        export const rbs_g = image("images/food/rbs-g.png");
        export const cds_g = image("images/food/cds-g.png");
        export const term_g = image("images/food/term-g.png");
        export const prom_y = image("images/food/prom-y.png");
        export const rbs_y = image("images/food/rbs-y.png");
        export const cds_y = image("images/food/cds-y.png");
        export const term_y = image("images/food/term-y.png");
        export const energy = image("images/food/energy.png");
    }
}
