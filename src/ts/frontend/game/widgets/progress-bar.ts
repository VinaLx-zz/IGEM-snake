interface IProgressBar {
    increase(n: number): void;
    decrease(n: number): void;
}

interface ConfiguredProgressBar extends IProgressBar {
    increment(): void;
    decrement(): void;
}

class ProgressBar implements IProgressBar {
    constructor(...observers: ProgressBarObserver[]) {
        this.observers = observers;
    }
    public increase(n: number) {
        let before = this.progress;
        if (100 - this.progress < n) this.progress = 100;
        else this.progress += n;
        let increased = this.progress - before;

        this.observers.forEach(o => {
            if (o.whenChange) o.whenChange(this.progress, increased);
        });
        if (this.progress == 100) {
            this.observers.forEach(o => { if (o.whenFull) o.whenFull(); });
        }
    }
    public decrease(n: number) {
        let before = this.progress;
        if (this.progress < n) this.progress = 0;
        else this.progress -= n;
        let decreased = before - this.progress;

        this.observers.forEach(o => {
            if (o.whenChange) o.whenChange(this.progress, -decreased);
        });
        if (this.progress == 0) {
            this.observers.forEach(o => { if (o.whenEmpty) o.whenEmpty(); });
        }
    }
    observers: ProgressBarObserver[];
    progress: number = 0;
}

class SimpleConfiguredBar extends ProgressBar implements ConfiguredProgressBar {
    constructor(
        incRate: number, decRate: number, ...observers: ProgressBarObserver[]) {
        super(...observers);
        this.incRate = incRate;
        this.decRate = decRate;
    }
    increment(): void {
        this.increase(this.incRate);
    }
    decrement(): void {
        this.decrease(this.decRate);
    }
    incRate: number;
    decRate: number;
}

interface ProgressBarCallBack {
    (now: number, change: number): void;
}

interface ProgressBarObserver {
    whenChange?: ProgressBarCallBack;
    whenEmpty?: () => void;
    whenFull?: () => void;
}
