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
    Snake(): Snake;
    NumFoodsOnBoard(): number;

    // mutator
    AddEnergy(pos: Vector, onEaten: () => void): void;
    AddPart(
        color: food.Color, type: food.Part,
        pos: Vector, onEaten: () => void): void;
}