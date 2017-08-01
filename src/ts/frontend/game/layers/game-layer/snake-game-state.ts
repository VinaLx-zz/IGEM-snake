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
    NextFood(c: food.Color): food.Part;
    Snake(): Snake;
    NumFoodsOnBoard(): number;
}