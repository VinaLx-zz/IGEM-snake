/// <reference path="../../util/bound.ts" />
/// <reference path="../parameters.ts" />
/// <reference path="../images.ts" />

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

interface Food {
    Eat(): void;
    Reachable(pos: Vector): Boolean;
}

abstract class AbstractFood {
    constructor(bound: PositionedBound) {
        this.bound = bound;
    }

    abstract Eat(): void;

    Reachable(pos: Vector): Boolean {
        return this.bound.Contains(pos);
    }
    bound: PositionedBound;
}

class Energy extends AbstractFood {
    constructor(
        x: number, y: number, r: number, pb: ProgressBar) {
        super(new CircleBound(x, y, r));
        this.progressBar = pb;
    }
    Eat(): void {
        this.progressBar.increase(
            param.ENERGY_TIME_GAIN / param.LIFE_TIME_PER_UNIT);
    }
    progressBar: ProgressBar;
}

class Part extends AbstractFood {
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
        this.dispatcher = {};
        for (const [color, complete] of colorWithCompletes) {
            this.dispatcher[color] =
                new Target(complete, () => food.GenerateSequence(color));
        }
    }
    Consume(type: food.Part, color: food.Color): void {
        this.dispatcher[color].Consume(type);
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