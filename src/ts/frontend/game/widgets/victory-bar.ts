/// <reference path="./progress-bar.ts" />

class VictoryBar extends SimpleConfiguredBar {
    constructor(
        incRate: number, decRate: number, win: () => void) {
        super(incRate, decRate, { whenFull: win });
    }
}