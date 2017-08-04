/// <reference path="../game-layer/food-generator.ts" />

class TutorialFoodGenerator implements FoodGenerator {
    Generate(time: number, state: SnakeGameState): FoodAdder {
        return FoodAdder.None;
    }
    StartRed(): void {

    }
    StartBlue(): void {

    }
    StartGreen(): void {

    }
    StartYello(): void {

    }
}