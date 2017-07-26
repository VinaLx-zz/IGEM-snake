/// <reference path="../../util/bound.ts" />
/// <reference path="./progress-bar.ts" />
/// <reference path="../game-control/time-interval-control.ts" />

class AccelerationOrb extends HoldButton<CircleBound> {
    constructor(
        bound: CircleBound, timeGain: number, timePerUnit: number,
        accelerate: () => void, slowDown: () => void) {
        super(() => this.Accelerate(), () => this.SlowDown(), bound);
        this.pb = new ProgressBar({
            whenEmpty: () => this.SlowDown()
        });
        this.pb.progress = 100;
        this.decreasing = new TimeIntervalControl(
            () => this.Decrement(), 1000 / param.FRAME_PER_SEC);
        this.slowDownCallback = slowDown;
        this.accelerateCallback = accelerate;
        this.timeGain = timeGain;
        this.timePerUnit = timePerUnit;
    }

    public Reposition(x: number, y: number): void {
        this.bound.origin = new Vector(x, y);
    }

    public Painter(): Painter {
        return Paint.Delay(() => {
            return this.PaintProgress().Then(
                Paint.PositionedImage(this.bound, IMG.GAME.acceleration));
        })
    }
    private PaintProgress(): Painter {
        const [ox, oy] = this.bound.origin.Pair();
        const r = this.bound.R();
        const [x, y] = this.bound.Position().Pair();
        const newY = y + 2 * r * (1 - this.pb.progress / 100);
        return Paint.Circle("red", ox, oy, r)
            .ClipRect(x, newY, 2 * r, y + 2 * r - newY);
    }

    private Accelerate(): void {
        if (!this.decreasing.IsStopped() || this.pb.progress === 0) return;
        this.accelerateCallback();
        this.decreasing.Start();
    }

    private SlowDown(): void {
        if (this.decreasing.IsStopped()) return;
        this.slowDownCallback();
        this.decreasing.Stop();
    }

    Increment(): void {
        this.pb.increase(this.timeGain / this.timePerUnit);
    }
    Decrement(): void {
        this.pb.decrease(1 / this.timePerUnit / param.FRAME_PER_SEC);
    }

    pb: ProgressBar;
    accelerateCallback: () => void;
    slowDownCallback: () => void;
    decreasing: TimeIntervalControl;
    /**
     * time gain after each increment
     */
    timeGain: number;
    /**
     * time represented by each unit of the progress bar
     */
    timePerUnit: number;
}
