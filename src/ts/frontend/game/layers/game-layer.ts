/// <reference path="../widgets/snake.ts" />
/// <reference path="../widgets/rocker.ts" />
/// <reference path="../../util/bound.ts" />
/// <reference path="../widgets/aceleration-orb.ts" />
/// <reference path="../widgets/food.ts" />

enum Level { Easy, Normal, Hard };

interface FoodGenerator {
    (time: number, layer: GameLayer): Food;
}

namespace game {
    function DummyGenerator(): Food {
        return new Energy(0, 0, 0, new ProgressBar());
    }
    export function NewGameByLevel(
        l: Level, control: LayerControl): GameLayer {
        return new GameLayer(DummyGenerator, control);
    }
}

class GameLayer extends AbstractLayer {
    constructor(foodgen: FoodGenerator, control: LayerControl) {
        super(control, {})
        this.board = new CircularRectBound(0, 0, 1, 0.75);
        this.InitSnake();
        this.go = new TimeIntervalControl(
            t => { this.TakeTurn(t); }, 1000 / param.FRAME_PER_SEC);
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
                        this.rocker.dot.X, this.rocker.dot.Y,
                        SZ.GAME.ROCKER_DOT_R),
                    IMG.GAME.rockerDot));
        });
    }
    GameStart(): void { this.go.Start(); }
    GameStop(): void { this.go.Stop(); }

    private TakeTurn(time: number): void {
        this.snake.Move(this.board);
    }

    /**
     * translate v in the logical screen to real screen
     */
    private Translate(v: Vector): Vector {
        const [cx, cy] = this.snake.Head().Pair();
        const tmp = v.Alter(
            x => x - (cx - 0.5),
            y => y - (cy - SZ.HEIGHT_FACTOR / SZ.WIDTH_FACTOR / 2));
        return this.board.Adjust(tmp);
    }

    private PaintAcceleration(): Painter {
        return this.acceleration.Painter();
    }
    private PaintSnake(): Painter {
        return Paint.Delay(() => {
            const bodies = this.snake.Bodies();
            let res = Paint.Noop();
            for (let i = bodies.length - 1; i >= 0; --i) {
                res = res.Then(Nematode.PaintBody(this.Translate(bodies[i])));
            }
            return res.Then(
                Nematode.PaintHead(this.Translate(this.snake.Head())));
        })
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
    go: TimeIntervalControl;
}