class Slides {
    constructor(images: HTMLImageElement[]) {
        this.images = images;
    }
    Next(): Boolean {
        if (this.current < this.images.length - 1) {
            ++this.current;
            return true;
        }
        return false;
    }
    Prev(): Boolean {
        if (this.current > 0) {
            --this.current;
            return true;
        }
        return false;
    }
    Painter(): Painter {
        return Paint.Delay(
            () => Paint.Background(this.images[this.current]));
    }
    current: number = 0;
    images: HTMLImageElement[];
}
