/// <reference path="../widgets/snake.ts" />
/// <reference path="../widgets/rocker.ts" />
/// <reference path="../../util/bound.ts" />
/// <reference path="../widgets/aceleration-orb.ts" />
/// <reference path="../widgets/food.ts" />
/// <reference path="../widgets/board.ts" />
/// <reference path="../widgets/bar-bar-bar.ts" />
/// <reference path="../widgets/genetic-circuit.ts" />

enum Level { Easy, Normal, Hard };

interface FoodGenerator {
    (time: number, layer: GameLayer): void;
}

namespace game {
    export function NewGameByLevel(
        l: Level, control: LayerControl): GameLayer {
        return new GameLayer(gameParam.Default(), Func.Noop, control);
    }
}

class GameLayer extends AbstractLayer {
    constructor(
        params: GameParam, foodgen: FoodGenerator, control: LayerControl) {
        super(control, {}, true);
        this.params = params;
        this.InitBoard();
        this.InitBars();
        this.Init(); // init from super
        this.go = new TimeIntervalControl(
            t => this.TakeTurn(t), 1000 / param.FRAME_PER_SEC)
        this.InitGeneticCircuits();
        this.GameStart();
    }
    private InitGeneticCircuits() {
        this.geneticCircuits = new GeneticCircuits(this.bbb, this.acceleration);
    }

    private InitBoard(): void {
        const p = this.params;
        const bound = new CircularRectBound(
            0, 0, p.BOARD_WIDTH, p.BOARD_HEIGHT);
        this.snake = new Nematode(
            new Vector(0.5, 0.375), this.params.SNAKE_NORMAL_SPEED,
            this.params.SNAKE_ACCELERATED_SPEED, bound);
        this.board = new Board(this.snake, p.VISION_INIT);
        for (let i = 0; i < p.SNAKE_INIT_LENGTH; ++i) {
            this.board.SnakeGrow();
        }
    }
    private InitBars(): void {
        const p = this.params;
        const eb = new EnergyBar(
            p.LIFE_TIME_INIT, p.LIFE_TIME_PER_UNIT, p.ENERGY_TIME_GAIN,
            10, this.snake, Func.Noop);
        const vsb = new VisionBar(
            p.VISION_GAIN, p.VISION_DEC_PER_FRAME, this.board);
        const vcb = new VictoryBar(
            p.TARGET_GAIN, p.TARGET_DEC_PER_FRAME, Func.Noop);
        this.bbb = new BarBarBar(eb, vsb, vcb);
    }

    Painter(): Painter {
        return this.PaintBackground()
            .Then(this.PaintBoard())
            .Then(this.PaintRocker())
            .Then(this.PaintAcceleration())
            .Then(this.PaintProgressBars())
            .Then(this.PaintTargets())
            .Then(this.PaintSetting());
    }
    private PaintBoard(): Painter {
        return this.board.Painter();
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
        this.board.MoveSnake();
        this.bbb.Decrement();
        this.generateFood(time, this);
    }

    private PaintAcceleration(): Painter {
        return this.acceleration.Painter();
    }
    private PaintProgressBars(): Painter {
        return this.bbb.Painter();
    }
    private PaintTargets(): Painter {
        return this.geneticCircuits.Painter();
    }
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
            this.params.ACCELERATE_TIME_GAIN,
            this.params.ACCELERATE_TIME_PER_UNIT,
            this.board.snake);
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
        const x = leftRocker ?
            SZ.GAME.RIGHT_ACCELERATION_X :
            SZ.GAME.LEFT_ACCELERATION_X;
        const y = SZ.GAME.ACCELERATION_Y;
        return new CircleBound(x, y, SZ.GAME.ACCELERATION_R);
    }

    private RockerBound(): Bound {
        return Bound.Sub(
            new RectBound(0, 0, 1, SZ.HEIGHT_FACTOR / SZ.WIDTH_FACTOR),
            Bound.Add(this.acceleration.bound, this.setting.bound));
    }

    acceleration: AccelerationOrb;
    setting: ClickButton<CircleBound>;
    rocker: Rocker;
    snake: Nematode;
    bbb: BarBarBar;
    board: Board;
    geneticCircuits: GeneticCircuits;
    generateFood: FoodGenerator;
    go: TimeIntervalControl;
    params: Readonly<GameParam>;
}