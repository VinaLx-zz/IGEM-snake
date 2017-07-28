interface TimeIntervalCallback {
    (time: number): void;
}

class TimeIntervalControl {
    constructor(callback: TimeIntervalCallback, interval: number) {
        this.callback = callback;
        this.interval = interval;
    }
    Start(): void {
        if (this.stamp !== null) return;
        this.stamp = window.setInterval(() => this.Callback(), this.interval);
    }
    Stop(): void {
        if (this.stamp === null) return;
        window.clearInterval(this.stamp);
        this.stamp = null;
    }
    IsStopped(): Boolean {
        return this.stamp === null;
    }
    private Callback(): void {
        this.time += this.interval;
        this.callback(this.time);
    }
    interval: number;
    callback: TimeIntervalCallback;
    time: number = 0;
    stamp: number | null = null;
}