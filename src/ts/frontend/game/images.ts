namespace IMG {
    function image(src: string): HTMLImageElement {
        const img = new Image(600, 600);
        img.src = src;
        return img;
    }
    export namespace BG {
        export const start = image("images/startbackground.png");
    }
    export namespace BTN {
        export const start = image("images/startbutton.png");
        export const setting = image("images/settingbutton.png");
        export const help = image("images/helpbutton.png");
    }
}