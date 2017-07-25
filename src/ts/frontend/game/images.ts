namespace IMG {
    function image(src: string): HTMLImageElement {
        const img = new Image(600, 600);
        img.src = src;
        return img;
    }
    export namespace BG {
        export const start = image("images/start/background.png");
        export const setting = image("images/setting/background.png");
        export const help = image("images/help/background.png");
        export const mode = image("images/mode/background.png");
    }
    export namespace BTN {
        export const start = image("images/start/startbutton.png");
        export const setting = image("images/start/settingbutton.png");
        export const help = image("images/start/helpbutton.png");
        export const back = image("images/setting/back.png");
        export const easy = image("images/mode/easy.png");
        export const normal = image("images/mode/normal.png");
        export const hard = image("images/mode/hard.png");
        export const tutorial = image("images/mode/tutorial.png");
        export const tellStory = image("images/help/tell-me-story.png");
        export const how2play = image("images/help/how-to-play.png");
        export const learnBio = image("images/help/synthetic-bio.png");
    }
    export namespace GAME {
        export const rockerBack = image("images/game/rocker-back.png");
        export const rockerDot = image("images/game/rocker-dot.png");
        export const acceleration = image("images/game/acceleration.png");
        export const setting = image("images/game/setting.png");
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