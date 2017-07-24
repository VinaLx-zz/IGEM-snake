class TimeIntervalControl {
    constructor(callback: () => void, interval: number) {
        this.callback = callback;
        this.interval = interval;
    }
    Start(): void {
        if (this.stamp !== null) return;
        this.stamp = window.setInterval(this.callback, this.interval);
    }
    Stop(): void {
        if (this.stamp === null) return;
        window.clearInterval(this.stamp);
        this.stamp = null;
    }
    IsStopped(): Boolean {
        return this.stamp === null;
    }
    interval: number;
    callback: () => void;
    stamp: number | null = null;
}