/// <reference path="../../util/bound.ts" />
/// <reference path="../../util/random.ts" />
/// <reference path="../widgets/rocker.ts" />
/// <reference path="../widgets/aceleration-orb.ts" />
/// <reference path="../widgets/food.ts" />
/// <reference path="./game-layer/food-library.ts" />
/// <reference path="./game-layer/game-config.ts"  />
/// <reference path="./game-layer/level.ts" />
/// <reference path="./game-layer/snake-game.ts" />


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
                food.GetPart(
                    color, type, pos, layer.geneticCircuits, callback));
    }
}


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
        config: GameConfig, foodgen: FoodGenerator,
        seqGen: SequenceGenerator, control: LayerControl) {
        super(control, {
            KeyDown: k =>
                k === " " ? this.game.Snake().Accelerate() : undefined,
            KeyUp: k =>
                k === " " ? this.game.Snake().SlowDown() : undefined
        }, true);
        this.game = new SnakeGame(config);
        this.buttons = this.Buttons();
        this.painter = this.Painter();
        this.generator = foodgen;
        this.go = new TimeIntervalControl(
            t => this.TakeTurn(t), 1000 / param.FRAME_PER_SEC)
        this.GameStart();
    }
    Painter(): Painter {
        return this.PaintBackground()
            .Then(this.game.Painter())
            .Then(this.PaintRocker())
            .Then(this.PaintAcceleration())
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
        this.game.NextState();
        this.generator.Generate(time, this)(this);
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
        this.rocker = this.InitRocker();
        return Button.Add(this.acceleration, this.rocker);
    }

    private InitAcceleration(): HoldButton<CircleBound> {
        return new HoldButton(
            () => this.game.Snake().Accelerate(),
            () => this.game.Snake().SlowDown(),
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
            this.acceleration.bound);
    }

    acceleration: HoldButton<CircleBound>;
    rocker: Rocker;
    generator: FoodGenerator;
    go: TimeIntervalControl;
    game: SnakeGame;
}