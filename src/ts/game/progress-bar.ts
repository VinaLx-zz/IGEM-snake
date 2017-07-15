/// <reference path="../util/function.ts" />

class ProgressBarModel {
    constructor(...observers: ProgressBarObserver[]) {
        this.observers = observers;
    }
    public increase(n: number) {
        let before = this.progress;
        if (100 - this.progress < n) this.progress = 100;
        else this.progress += n;
        let increased = this.progress - before;

        this.observers.forEach(o => o.whenChange(this.progress, increased));
        if (this.progress == 100) {
            this.observers.forEach(o => o.whenFull());
        }
    }
    public decrease(n: number) {
        let before = this.progress;
        if (this.progress < n) this.progress = 0;
        else this.progress -= n;
        let decreased = before - this.progress;

        this.observers.forEach(o => o.whenChange(this.progress, -decreased));
        if (this.progress == 0) {
            this.observers.forEach(o => o.whenEmpty());
        }
    }
    observers: ProgressBarObserver[];
    progress: number = 0;
}

interface ProgressBarCallBack {
    (now: number, change: number): void;
}

class ProgressBarObserver {
    constructor(
        whenChange: ProgressBarCallBack | null,
        whenFull: null | (() => void),
        whenEmpty: null | (() => void)) {
        if (whenChange) {
            this.whenChange = whenChange;
        }
        if (whenFull) {
            this.whenFull = whenFull;
        }
        if (whenEmpty) {
            this.whenEmpty = whenEmpty;
        }
    }
    whenChange: ProgressBarCallBack = Func.Noop;
    whenFull: () => void = Func.Noop;
    whenEmpty: () => void = Func.Noop;
}
