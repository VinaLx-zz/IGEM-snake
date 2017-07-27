/// <reference path="../../util/bound.ts" />
/// <reference path="../parameters.ts" />
/// <reference path="../images.ts" />
/// <reference path="./progress-bar.ts" />
/// <reference path="../../util/enum.ts" />

namespace food {
    export enum Color {
        RED    = 0, // acceleration
        GREEN  = 1, // vision
        YELLOW = 2  // score
    }
    export enum Part {
        PROM = 0,  // the angled arrow
        RBS  = 1,  // the semi-circle
        CDS  = 2,  // the polygon
        TERM = 3   // the T shaped
    }
    export function GenerateSequence(color: Color): Part[] {
        return [Part.PROM, Part.RBS, Part.CDS, Part.TERM];
    }
}

abstract class Food implements Positioned, Sized {
    constructor(bound: PositionedBound) {
        this.bound = bound;
    }

    abstract Eat(): void;
    abstract Image(): HTMLImageElement;

    Reachable(pos: Vector): Boolean {
        return this.bound.Contains(pos);
    }
    Width(): number { return this.bound.Width(); }
    Height(): number { return this.bound.Height(); }
    X(): number { return this.bound.X(); }
    Y(): number { return this.bound.Y(); }

    bound: PositionedBound;
}

class Energy extends Food {
    constructor(
        x: number, y: number, r: number, pb: EnergyBar) {
        super(new CircleBound(x, y, r));
        this.pb = pb;
    }
    Eat(): void {
        this.pb.increment();
    }
    Image(): HTMLImageElement {
        return IMG.FOOD.energy;
    }
    pb: EnergyBar;
}

/**
 * first dim is color
 * second is type(part)
 */
const foodTable: HTMLImageElement[][] = [
    [IMG.FOOD.prom_r, IMG.FOOD.rbs_r, IMG.FOOD.cds_r, IMG.FOOD.term_r],
    [IMG.FOOD.prom_g, IMG.FOOD.rbs_g, IMG.FOOD.cds_g, IMG.FOOD.term_g],
    [IMG.FOOD.prom_y, IMG.FOOD.rbs_y, IMG.FOOD.cds_y, IMG.FOOD.term_y]];

class Part extends Food {
    constructor(
        x: number, y: number, w: number, h: number,
        type: food.Part, color: food.Color,
        machine: FoodMachine) {
        super(new RectBound(x, y, w, h));
        this.type = type;
        this.color = color;
        this.machine = machine;
    }
    Eat(): void {
        this.machine.Consume(this.type, this.color);
    }
    Image(): HTMLImageElement {
        return foodTable[this.color][this.type];
    }
    type: food.Part;
    color: food.Color;
    machine: FoodMachine;
}

interface TargetCompleteCallback {
    (sequence: food.Part[]): void;
}

interface FoodMachine {
    Consume(type: food.Part, color: food.Color): void;
}
type FoodDispatcher = {
    [color: number]: Target;
}

class ColorfulFoodMachine implements FoodMachine {
    constructor(...colorWithCompletes: [food.Color, TargetCompleteCallback][]) {
        this.dispatcher = ColorfulFoodMachine.InitDispatcher();
        for (const [color, complete] of colorWithCompletes) {
            this.dispatcher[color] =
                new Target(complete, () => food.GenerateSequence(color));
        }
    }
    Consume(type: food.Part, color: food.Color): void {
        this.dispatcher[color].Consume(type);
    }
    private static InitDispatcher(): FoodDispatcher {
        let dispatcher: FoodDispatcher = {};
        for (const v of Enum.Values(food.Color)) {
            dispatcher[v] = new Target(Func.Noop, Func.Const([]));
        }
        return dispatcher;
    }
    dispatcher: FoodDispatcher;
}

class Target {
    constructor(
        onComplete: TargetCompleteCallback,
        seqGenerator: () => food.Part[]) {
        this.onComplete = onComplete;
        this.generate = seqGenerator;
        this.sequence = this.generate();
    }
    Consume(type: food.Part) {
        if (this.sequence[this.current] == type) {
            if (++this.current == this.sequence.length) {
                this.onComplete(this.sequence);
                this.sequence = this.generate();
                this.current = 0;
            }
        } else {
            this.current = 0;
        }
    }
    sequence: food.Part[];
    current: number = 0;
    onComplete: TargetCompleteCallback;
    generate: () => food.Part[];
}
