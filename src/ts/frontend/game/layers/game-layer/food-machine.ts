/// <reference path="../../widgets/food.ts" />
/// <reference path="./level.ts" />
/// <reference path="../../widgets/progress-bar.ts" />
/// <reference path="../../widgets/bar-bar-bar.ts" />
/// <reference path="../../widgets/acceleration-bar.ts" />

interface TargetGenerator {
    Generate(color: food.Color): TargetSequence;
}
interface TargetDispatcher {
    [color: number]: TargetSequence;
}

abstract class ColorFoodMachine implements FoodMachine {
    constructor(dispatcher: TargetDispatcher, generator: TargetGenerator) {
        this.generator = generator;
        this.dispatcher = dispatcher;
    }
    Consume(type: food.Part, color: food.Color): void {
        if (this.dispatcher[color].Consume(type))
            this.Generate(color);
    }
    Complete(color: food.Color): void {
        this.Generate(color);
    }
    Generate(color: food.Color): void {
        const next = this.generator.Generate(color);
        const nextColor = next.Color();
        if (nextColor === color) {
            this.dispatcher[color] = next;
        } else {
            this.dispatcher[color] = machine.noopTarget;
            if (nextColor !== null) this.dispatcher[nextColor] = next;
        }
    }
    SetTarget(target: TargetSequence) {
        const color = target.Color();
        if (color === null) return;
        this.dispatcher[color] = target;
    }
    generator: TargetGenerator;
    dispatcher: TargetDispatcher;
}

interface TargetSequence {
    Consume(part: food.Part): Boolean;
    Color(): food.Color | null;
    Next(): food.Part | null;
    Rest(): food.Part[];
}

abstract class AbstractTargetSequence implements TargetSequence {
    constructor(color: food.Color, sequence: food.Part[]) {
        this.color = color;
        this.sequence = sequence;
    }
    Consume(part: food.Part): Boolean {
        if (this.sequence[this.cur] === part) {
            if (++this.cur === this.sequence.length) {
                this.Complete();
                return true;
            }
        } else {
            this.cur = 0;
            this.Punish();
        }
        return false;
    }
    Color(): food.Color {
        return this.color;
    }
    Rest(): food.Part[] {
        return this.sequence.slice(this.cur);
    }
    Next(): food.Part {
        return this.sequence[this.cur];
    }
    abstract Complete(): void;
    abstract Punish(): void;
    color: food.Color;
    sequence: food.Part[];
    cur: number = 0;
}

class BarIncrementTarget extends AbstractTargetSequence {
    constructor(
        color: food.Color, sequence: food.Part[], bar: ConfiguredProgressBar,
        complete: () => void, punish: () => void) {
        super(color, sequence);
        this.punish = punish;
        this.complete = complete;
        this.bar = bar;
    }
    Complete(): void {
        this.bar.increment();
        this.complete();
    }
    Punish(): void {
        this.punish();
    }
    bar: ConfiguredProgressBar;
    complete: () => void;
    punish: () => void;
}

abstract class GameSequenceGenerator implements TargetGenerator {
    constructor(
        victory: VictoryBar,
        vision: VisionBar,
        acceleration: AccelerationBar) {
        this.victory = victory;
        this.vision = vision;
        this.acceleration = acceleration;
    }
    abstract Generate(color: food.Color): TargetSequence;

    protected MakeSequence(
        color: food.Color, sequence: food.Part[],
        complete: () => void = Func.Noop, punish: () => void = Func.Noop) {
        switch (color) {
            case food.Color.RED: return machine.RedTarget(
                sequence, this.acceleration, complete, punish);
            case food.Color.GREEN: return machine.GreenTarget(
                sequence, this.vision, complete, punish);
            case food.Color.YELLOW: return machine.YellowTarget(
                sequence, this.victory, complete, punish);
        }
    }

    victory: VictoryBar;
    vision: VisionBar;
    acceleration: AccelerationBar;
}

namespace machine {
    export const noopTarget: TargetSequence = {
        Consume: Func.Const(false),
        Color: Func.Const(null),
        Next: Func.Const(null),
        Rest: Func.Const([])
    }
    export const noopGenerator: TargetGenerator = {
        Generate: Func.Const(noopTarget)
    }
    export function EmptyDispatcher(): TargetDispatcher {
        let res = <TargetDispatcher>{};
        for (const c of Enum.Values(food.Color)) {
            res[c] = noopTarget;
        }
        return res;
    }
    export function InitAllColor(gen: TargetGenerator) {
        let res = EmptyDispatcher();
        for (const c of Enum.Values(food.Color)) {
            res[c] = gen.Generate(c);
        }
        return res;
    }
    export function RedTarget(
        sequence: food.Part[], accelerate: AccelerationBar,
        complete: () => void = Func.Noop, punish: () => void = Func.Noop) {
        return new BarIncrementTarget(
            food.Color.RED, sequence, accelerate, complete, punish);
    }
    export function YellowTarget(
        sequence: food.Part[], victory: VictoryBar,
        complete: () => void = Func.Noop, punish: () => void = Func.Noop) {
        return new BarIncrementTarget(
            food.Color.YELLOW, sequence, victory, complete, punish);
    }
    export function GreenTarget(
        sequence: food.Part[], vision: VisionBar,
        complete: () => void = Func.Noop, punish: () => void = Func.Noop) {
        return new BarIncrementTarget(
            food.Color.GREEN, sequence, vision, complete, punish);
    }
}