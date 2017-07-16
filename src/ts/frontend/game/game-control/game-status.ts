// global game status that a layer can access
class GameStatus {
    constructor (width: number, height: number) {
        this.canvasWidth = width;
        this.canvasHeight = height;
    }
    canvasWidth: number;
    canvasHeight: number;
}