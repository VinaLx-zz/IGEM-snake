/// <reference path="../../widgets/food.ts" />
/// <reference path="../../widgets/bar-bar-bar.ts" />
/// <reference path="../../widgets/acceleration-bar.ts" />
/// <reference path="../../widgets/snake.ts" />

interface SnakeGameState {
    Painter(): Painter;
    NextState(): void;

    // component
    Machine(): FoodMachine;
    AccelerationBar(): AccelerationBar;
    EnergyBar(): EnergyBar;
    VisionBar(): VisionBar;
    VictoryBar(): VictoryBar;

    // inspectors
    NextFood(c: food.Color): food.Part | null;
    RestFood(c: food.Color): food.Part[];
    Snake(): Snake;
    NumFoodsOnBoard(): number;
    FoodEaten(): number;
    TargetCompleted(): number;
    Win(): Boolean;
    Lose(): Boolean;

    // mutator
    AddEnergy(pos: Vector, onEaten: () => void): void;
    AddPart(
        color: food.Color, type: food.Part,
        pos: Vector, onEaten: () => void): void;
    GenerateTarget(color: food.Color): void;
}