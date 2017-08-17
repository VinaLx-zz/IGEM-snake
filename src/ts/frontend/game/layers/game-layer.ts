/// <reference path="../../util/bound.ts" />
/// <reference path="../../util/random.ts" />
/// <reference path="../widgets/rocker.ts" />
/// <reference path="../widgets/food.ts" />
/// <reference path="./pause-layer.ts" />
/// <reference path="./gameover-layer.ts" />
/// <reference path="./game-layer/food-library.ts" />
/// <reference path="./game-layer/game-config.ts"  />
/// <reference path="./game-layer/level.ts" />
/// <reference path="./game-layer/snake-game.ts" />
/// <reference path="./game-layer/game-layer-interface.ts" />

namespace game {
    export function PushGameOverLayer(
        layer: GameLayer, control: LayerControl, win: Boolean) {
        layer.Pause();
        control.PushLayer(new GameOverLayer({
            win: win,
            time: layer.GameTime(),
            foodEaten: layer.State().FoodEaten()
        }, () => layer.Restart(), control));
    }
    export function NewGameByLevel(
        l: Level, control: LayerControl): GameLayer {
        const config = GameConfigByLevel(l);
        const foodgen = new LeveledGenerator(
            l, config.BOARD_WIDTH, config.BOARD_HEIGHT);
        return new GameLayerImpl(
            config, foodgen, control,
            PushGameOverLayer, PushGameOverLayer,
            () => {
                const game = NewGameByLevel(l, control);
                control.PushLayer(game);
                game.Start();
            });
    }
    export function GameConfigByLevel(l: Level): GameConfig {
        switch (l) {
            case Level.Easy: return new EasyConfig();
            case Level.Normal: return new NormalConfig();
            case Level.Hard: return new HardConfig();
        }
    }
}

class GameLayerImpl extends AbstractLayer implements GameLayer {
    constructor(
        config: GameConfig, foodgen: FoodGenerator, control: LayerControl,
        win: GameFinishCallback, lose: GameFinishCallback,
        restart: () => void,
        onQuit: () => void = Func.Noop) {
        super(control, {
            KeyDown: k =>
                k === " " ? this.game.AccelerationBar().Accelerate() : undefined,
            KeyUp: k =>
                k === " " ? this.game.AccelerationBar().SlowDown() : undefined
        }, true);
        this.game = new SnakeGame(config);
        this.Init();
        this.generator = foodgen;
        this.go = new TimeIntervalControl(
            t => this.TakeTurn(t), 1000 / param.FRAME_PER_SEC);
        this.win = win;
        this.lose = lose;
        this.restartCallback = restart;
        this.pauseLayer = new PauseLayer(
            () => this.Restart(), onQuit, this, control);
    }
    Painter(): Painter {
        return this.PaintBackground()
            .Then(this.game.Painter())
            .Then(this.PaintRocker())
            .Then(this.PaintAcceleration())
            .Then(this.pause.Painter());
    }
    private PaintBackground(): Painter {
        return Paint.BackgroundColor("#fffaf0");
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
    Start(): void { this.go.Start(); }
    Pause(): void { this.go.Stop(); }
    State(): SnakeGameState { return this.game; }

    PushPauseLayer(): void {
        this.Pause();
        this.control.PushLayer(this.pauseLayer);
    }
    GameTime(): number {
        return this.time;
    }
    Restart(): void {
        this.control.PopLayer();
        this.restartCallback();
    }

    private TakeTurn(time: number): void {
        this.game.NextState();
        this.time += 1 / param.FRAME_PER_SEC;
        if (this.game.Win()) {
            this.win(this, this.control, true);
            return;
        } else if (this.game.Lose()) {
            this.lose(this, this.control, false);
            return;
        }
        this.generator.Generate(time, this.game)(this.game);
    }

    private PaintAcceleration(): Painter {
        return Paint.Delay(() =>
            this.PaintAccelerateProgress().Then(
                Paint.PositionedImage(
                    this.acceleration.bound, IMG.GAME.acceleration)));
    }
    private PaintAccelerateProgress(): Painter {
        const b = this.acceleration.bound;
        const [ox, oy] = b.origin.Pair();
        const r = b.R();
        const [x, y] = b.Position().Pair();
        const newY = y + 2 * r * (1 - this.game.AccelerationBar().progress / 100);
        return Paint.Circle("red", ox, oy, r)
            .ClipRect(x, newY, 2 * r, y + 2 * r - newY);
    }

    Buttons(): MouseEventCatcher {
        this.acceleration = this.InitAcceleration();
        this.pause = this.InitPauseButton();
        this.rocker = this.InitRocker();
        return Button.Add(this.acceleration, this.rocker, this.pause);
    }

    private InitAcceleration(): HoldButton<CircleBound> {
        return new HoldButton(
            () => this.game.AccelerationBar().Accelerate(),
            () => this.game.AccelerationBar().SlowDown(),
            new CircleBound(
                SZ.GAME.RIGHT_ACCELERATION_X, SZ.GAME.ACCELERATION_Y,
                SZ.GAME.ACCELERATION_R));
    }

    private InitRocker(): Rocker {
        const leftRocker = this.control.gs.leftRocker;
        const x = leftRocker ? SZ.GAME.LEFT_ROCKER_X : SZ.GAME.RIGHT_ROCKER_X;
        const y = SZ.GAME.ROCKER_Y;
        return new Rocker(
            new Vector(x, y), this.RockerBound(),
            new CircleBound(x, y, SZ.GAME.ROCKER_R),
            dir => this.game.Snake().direction = dir);
    }
    private RockerBound(): Bound {
        return Bound.Sub(
            new RectBound(0, 0, 1, SZ.RELATIVE_HEIGHT),
            Bound.Add(this.acceleration.bound, this.pause.bound));
    }
    private InitPauseButton(): AnimatedButton<RectBound> {
        return new AnimatedButton(
            new RectBound(
                SZ.GAME.PAUSE_X, SZ.GAME.PAUSE_Y,
                SZ.GAME.PAUSE_W, SZ.GAME.PAUSE_H),
            IMG.BTN.pause, IMG.BTN.pauseFocus,
            () => this.PushPauseLayer());
    }

    generator: FoodGenerator;
    acceleration: HoldButton<CircleBound>;
    rocker: Rocker;
    go: TimeIntervalControl;
    game: SnakeGame;

    win: GameFinishCallback;
    lose: GameFinishCallback;

    pause: AnimatedButton<RectBound>;
    pauseLayer: PauseLayer;

    restartCallback: () => void;
    time: number = 0;
}