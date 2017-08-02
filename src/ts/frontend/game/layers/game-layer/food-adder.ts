/// <reference path="./snake-game-state.ts" />
/// <reference path="../../../util/function.ts" />

interface FoodAdder {
    (game: SnakeGameState): void;
}

namespace FoodAdder {
    export const None = Func.Noop;
}

namespace Adder {
    export const None: FoodAdder = Func.Noop;
    export function Energy(
        pos: Vector, callback: () => void = Func.Noop): FoodAdder {
        return game => game.AddEnergy(pos, callback);
    }
    export function Part(
        color: food.Color, type: food.Part, pos: Vector,
        callback: () => void = Func.Noop): FoodAdder {
        return game => game.AddPart(color, type, pos, callback);
    }
}