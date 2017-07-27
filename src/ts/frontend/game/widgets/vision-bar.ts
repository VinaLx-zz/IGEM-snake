/// <reference path="./progress-bar.ts" />
/// <reference path="./snake.ts" />

class VisionBar extends SimpleConfiguredBar {
    constructor(incRate: number, decRate: number, snake: Nematode) {
        super(incRate, decRate, { whenChange: () => this.AdjustBrightness() });
    }
    AdjustBrightness(): void {
        // TODO
    }
    snake: Nematode;
}
