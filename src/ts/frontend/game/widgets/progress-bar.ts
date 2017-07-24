class ProgressBar {
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

interface ProgressBarCallBack {
    (now: number, change: number): void;
}

interface ProgressBarObserver {
    whenChange?: ProgressBarCallBack;
    whenEmpty?: () => void;
    whenFull?: () => void;
}
