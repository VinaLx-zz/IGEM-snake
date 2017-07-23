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
}