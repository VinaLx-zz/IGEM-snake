namespace IMG {
    function image(src: string): HTMLImageElement {
        const img = new Image();
        img.src = src;
        return img;
    }
    export namespace BTN {
        export const start = image("images/start.png");
        export const setting = image("images/start.png");
    }
}