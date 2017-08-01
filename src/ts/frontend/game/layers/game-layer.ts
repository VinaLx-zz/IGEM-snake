/// <reference path="../../util/bound.ts" />
/// <reference path="../../util/random.ts" />
/// <reference path="../widgets/snake.ts" />
/// <reference path="../widgets/rocker.ts" />
/// <reference path="../widgets/aceleration-orb.ts" />
/// <reference path="../widgets/food.ts" />
/// <reference path="../widgets/board.ts" />
/// <reference path="../widgets/bar-bar-bar.ts" />
/// <reference path="../widgets/genetic-circuit.ts" />
/// <reference path="../widgets/food-library.ts" />
/// <reference path="../game-control/game-params.ts"  />

interface FoodAdder {
    (layer: GameLayer): void;
}

namespace Adder {
    export const None = Func.Noop;
    export function Energy(
        pos: Vector, callback: () => void = Func.Noop): FoodAdder {
        return layer =>
            layer.board.AddFood(
                food.GetEnergy(pos, layer.bbb.energy, callback));
    }
    export function Part(
        color: food.Color, type: food.Part, pos: Vector,
        callback: () => void = Func.Noop): FoodAdder {
        return layer =>
            layer.board.AddFood(
                food.GetPart(color, type, pos, layer.geneticCircuits, callback));
    }
}

enum Level { Easy, Normal, Hard };

interface FoodGenerator {
    Generate(time: number, layer: GameLayer): FoodAdder;
}

abstract class IntervalGenerator implements FoodGenerator {
    constructor(interval: number) {
        this.interval = interval;
    }
    Generate(time: number, layer: GameLayer): FoodAdder {
        const tag = Math.floor(time / this.interval);
        if (tag === this.prevTag) return Adder.None;
        this.prevTag = tag;
        return this.GenerateImpl(time, layer);
    }
    abstract GenerateImpl(time: number, layer: GameLayer): FoodAdder;
    interval: number;
    prevTag: number = -1;

}

class LeveledGenerator extends IntervalGenerator {
    constructor(level: Level) {
        super(3000);
        this.partGen = Random.Nat(4);
        this.colorGen = Random.Nat(3);
    }
    GenerateImpl(time: number, layer: GameLayer): FoodAdder {
        const max_food = 50;
        if (this.count >= max_food) {
            return Adder.None;
        }
        return this.GetRandomGen(layer).gen();
    }
    private GetRandomGen(layer: GameLayer): RandGen<FoodAdder> {
        const posGen = Random.Map2(
            Random.NonNeg(layer.params.BOARD_WIDTH),
            Random.NonNeg(layer.params.BOARD_HEIGHT),
            (a, b) => new Vector(a, b));
        const nextGen = this.NextGen(posGen, layer.geneticCircuits);
        const restGen = this.PartGen(posGen);
        const energyGen = this.EnergyGen(posGen);
        return Random.WeightedGen(
            [nextGen, 0.3], [restGen, 0.3], [energyGen, 0.4]);
    }
    private EnergyGen(posGen: RandGen<Vector>): RandGen<FoodAdder> {
        return posGen.Map(v => Adder.Energy(v, () => --this.count));
    }
    private NextGen(
        posGen: RandGen<Vector>, circuit: GeneticCircuits): RandGen<FoodAdder> {
        return posGen.Bind(v =>
            this.colorGen.Map(c =>
                Adder.Part(c, circuit.Next(c), v, () => --this.count)));
    }
    private PartGen(posGen: RandGen<Vector>): RandGen<FoodAdder> {
        return posGen.Bind(v =>
            this.partGen.Bind(p =>
                this.colorGen.Map(c =>
                    Adder.Part(c, p, v, () => --this.count))));
    }
    partGen: RandGen<number>;
    colorGen: RandGen<number>;
    count: number = 0;
}

class TestGenerator implements FoodGenerator {
    Generate(time: number, layer: GameLayer): FoodAdder {
        const tag = Math.floor(time / 5000);
        if (tag == this.prevTag || this.count >= 100)
            return Adder.None;
        this.prevTag = tag;
        const x = Math.random();
        const y = Math.random() * SZ.RELATIVE_HEIGHT;
        const c = Math.floor(Math.random() * 3);
        const d = Math.floor(Math.random() * 4);
        ++this.count;
        // console.log(`food spawn, count: ${this.count}`);
        return Adder.Part(c, d, new Vector(x, y), () => {
            --this.count;
            // console.log(`food eaten, count: ${this.count}`);
        });
    }
    prevTag: number = -1;
    count: number = 0;
}

namespace game {
    export function NewGameByLevel(
        l: Level, control: LayerControl): GameLayer {
        const gen = new LeveledGenerator(l);
        const seqGen = SequenceGeneratorByLevel(l);
        const params = GameParamsByLevel(l);
        return new GameLayer(params, gen, seqGen, control);
    }
    export function SequenceGeneratorByLevel(l: Level): SequenceGenerator {
        const lib =
            l == Level.Easy ? foodLibrary.StrsToPartLib(foodLibrary.easy) :
                l == Level.Normal ?
                    foodLibrary.StrsToPartLib(foodLibrary.normal) :
                    foodLibrary.StrsToPartLib(foodLibrary.hard);
        return new RandomPickGenerator(lib);
    }
    export function GameParamsByLevel(l: Level): GameParam {
        let result: GameParam = <GameParam>{};
        switch (l) {
            case Level.Easy:
                result = gameParam.Custom({
                    ENERGY_TIME_GAIN: 8,
                    TARGET_DEC_PER_FRAME: 0,
                    TARGET_GAIN: 20
                });
                break;
            case Level.Normal:
                result = gameParam.Custom({
                    ENERGY_TIME_GAIN: 5,
                    TARGET_DEC_PER_FRAME: 0,
                    TARGET_GAIN: 20
                });
                break;
            case Level.Hard:
                result = gameParam.Custom({
                    ENERGY_TIME_GAIN: 5,
                    TARGET_DEC_PER_FRAME: 0.001,
                    TARGET_GAIN: 20
                });
                break;
        }
        return result;
    }
}

class GameLayer extends AbstractLayer {
    constructor(
        params: GameParam, foodgen: FoodGenerator,
        seqGen: SequenceGenerator, control: LayerControl) {
        super(control, {
            KeyDown: k => k === " " ? this.acceleration.Accelerate() : undefined,
            KeyUp: k => k === " " ? this.acceleration.SlowDown() : undefined
        }, true);
        this.params = params;
        this.InitBoard();
        this.InitBars();
        this.buttons = this.Buttons();
        this.InitGeneticCircuits(seqGen);
        this.painter = this.Painter();
        this.generator = foodgen;
        this.go = new TimeIntervalControl(
            t => this.TakeTurn(t), 1000 / param.FRAME_PER_SEC)
        this.GameStart();
    }
    private InitGeneticCircuits(gen: SequenceGenerator) {
        this.geneticCircuits = new GeneticCircuits(
            gen, this.bbb, this.acceleration);
    }

    private InitBoard(): void {
        const p = this.params;
        const bound = new CircularRectBound(
            0, 0, p.BOARD_WIDTH, p.BOARD_HEIGHT);
        this.snake = new Nematode(
            new Vector(0.5, 0.375), this.params.SNAKE_NORMAL_SPEED,
            this.params.SNAKE_ACCELERATED_SPEED, bound);
        this.board = new Board(this.snake, p.BASIC_VISION);
        for (let i = 0; i < p.SNAKE_INIT_LENGTH; ++i) {
            this.board.SnakeGrow();
        }
    }
    private InitBars(): void {
        const p = this.params;
        const eb = new EnergyBar(
            p.LIFE_TIME_INIT, p.LIFE_TIME_PER_UNIT, p.ENERGY_TIME_GAIN,
            10, this.snake, () => this.GameStop());
        const vsb = new VisionBar(
            p.VISION_GAIN, p.VISION_DEC_PER_FRAME, this.board);
        const vcb = new VictoryBar(
            p.TARGET_GAIN, p.TARGET_DEC_PER_FRAME, this.snake,
            () => this.GameStop());
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
    GameStart(): void { this.go.Start(); }
    GameStop(): void { this.go.Stop(); }

    private TakeTurn(time: number): void {
        this.board.MoveSnake();
        this.bbb.Decrement();
        this.generator.Generate(time, this)(this);
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
    generator: FoodGenerator;
    go: TimeIntervalControl;
    params: Readonly<GameParam>;
}