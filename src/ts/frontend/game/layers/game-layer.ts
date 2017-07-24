/// <reference path="../widgets/snake.ts" />
/// <reference path="../widgets/rocker.ts" />
/// <reference path="../../util/bound.ts" />
/// <reference path="../widgets/aceleration-orb.ts" />

enum Level { Easy, Normal, Hard };

class GameLayer extends AbstractLayer {
    constructor(level: Level, control: LayerControl) {
        super(control, {})
        this.board = new CircularRectBound(0, 0, 1, 0.75);
        this.InitSnake();
        this.GameStart();
    }

    private InitSnake(): void {
        this.snake = new Nematode(0.5, 0.375);
        for (let i = 0; i < 10; ++i) {
            this.snake.Grow(this.board);
        }
    }

    Painter(): Painter {
        return this.PaintBackground()
            .Then(this.PaintFoods())
            .Then(this.PaintSnake())
            .Then(this.PaintRocker())
            .Then(this.PaintAcceleration())
            .Then(this.PaintProgressBars())
            .Then(this.PaintTargets())
            .Then(this.PaintSetting());
    }
    private PaintBackground(): Painter {
        return Paint.BackgroundColor("white");
    }
    private PaintRocker(): Painter {
        return Paint.Delay(() => {
            return Paint.PositionedImage(
                this.rocker.circle, IMG.GAME.rockerBack)
                .Then(Paint.PositionedImage(
                    new Circle(
                        this.rocker.dot.X,
                        this.rocker.dot.Y,
                        SZ.GAME.ROCKER_DOT_R),
                    IMG.GAME.rockerDot));
        });
    }

    GameStart() {
        this.GameStop();
        this.stamp = window.setInterval(() => {
            this.TakeTurn();
        }, 1000 / param.FRAME_PER_SEC);
    }

    GameStop(): void {
        if (this.stamp) {
            window.clearInterval(this.stamp);
            this.stamp = null;
        }
    }
    private TakeTurn(): void {
        this.snake.Move(this.board);
    }

    private PaintAcceleration(): Painter {
        return this.acceleration.Painter();
    }
    private PaintSnake(): Painter {
        return Paint.Delay(() => this.snake.Paint());
    }
    private PaintFoods(): Painter {
        return Paint.Noop();
    }
    private PaintProgressBars(): Painter {
        return Paint.Noop();
    }
    private PaintTargets(): Painter {
        return Paint.Noop();
    };
    private PaintSetting(): Painter {
        return Paint.Delay(() => {
            return Paint.PositionedImage(this.setting.bound, IMG.GAME.setting);
        });
    }

    Buttons(): MouseEventCatcher {
        this.setting = this.InitSetting();
        this.acceleration = this.InitAcceleration();
        this.rocker = this.InitRocker();
        return Button.Add(this.setting, this.acceleration, this.rocker);
    }

    private InitSetting(): ClickButton<CircleBound> {
        const leftRocker = this.control.gs.leftRocker;
        return new ClickButton(Func.Noop, GameLayer.SettingBound(leftRocker));
    }

    private InitAcceleration(): AccelerationOrb {
        const leftRocker = this.control.gs.leftRocker;
        return new AccelerationOrb(
            GameLayer.AccelerationBound(leftRocker),
            () => this.snake.Accelerate(),
            () => this.snake.SlowDown());
    }

    private InitRocker(): Rocker {
        const leftRocker = this.control.gs.leftRocker;
        const x = leftRocker ? SZ.GAME.LEFT_ROCKER_X : SZ.GAME.RIGHT_ROCKER_X;
        const y = SZ.GAME.ROCKER_Y;
        return new Rocker(
            new Vector(x, y), this.RockerBound(),
            new CircleBound(x, y, SZ.GAME.ROCKER_R),
            dir => this.snake.direction = dir);
    }
    private static SettingBound(leftRocker: Boolean): CircleBound {
        const x = leftRocker ? SZ.GAME.RIGHT_SETTING_X : SZ.GAME.LEFT_SETTING_X;
        const y = SZ.GAME.SETTING_Y;
        return new CircleBound(x, y, SZ.GAME.SETTING_R);
    }
    private static AccelerationBound(leftRocker: Boolean): CircleBound {
        const x = leftRocker ? SZ.GAME.RIGHT_ACCELERATION_X : SZ.GAME.LEFT_ACCELERATION_X;
        const y = SZ.GAME.ACCELERATION_Y;
        return new CircleBound(x, y, SZ.GAME.ACCELERATION_R);
    }

    private RockerBound(): Bound {
        return Bound.Sub(
            new RectBound(0, 0, 1, SZ.HEIGHT_FACTOR / SZ.WIDTH_FACTOR),
            Bound.Add(this.acceleration.bound, this.setting.bound));
    }

    acceleration: AccelerationOrb;
    setting: ClickButton<CircleBound>
    rocker: Rocker;
    snake: Nematode;
    board: CircularRectBound;
    stamp: number | null;
}