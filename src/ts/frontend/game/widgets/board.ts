/// <reference path="./snake.ts" />
/// <reference path="./food.ts" />
/// <reference path="../../util/bound.ts" />
/// <reference path="../../util/list.ts" />

class Board {
    constructor(
        size: Vector, snake: Nematode, vision: number, foods: Food[] = []) {
        this.vision = vision;
        this.snake = snake;
        this.foods = List.FromArray(foods);
        this.bound = new CircularRectBound(0, 0, size.X, size.Y);
    }
    Painter(): Painter {
        return Paint.Delay(() => this.PaintFoods().Then(this.PaintSnake()));
    }
    private Translate(v: Vector): Vector {
        const [cx, cy] = this.snake.Head().Pair();
        const tmp = v.Alter(
            x => x - (cx - 0.5),
            y => y - (cy - SZ.HEIGHT_FACTOR / SZ.WIDTH_FACTOR / 2));
        return this.bound.Adjust(tmp);
    }
    private PaintFoods(): Painter {
        let p = Paint.Noop();
        this.foods.ForEach(f => p = p.Then(this.PaintFood(f)));
        return p;
    }
    private PaintFood(food: Food): Painter {
        return Paint.RepositionedImage(
            food, v => this.Translate(v), food.Image());
    }
    private PaintSnake(): Painter {
        const bodies = this.snake.Bodies();
        let res = Paint.Noop();
        for (let i = bodies.length - 1; i >= 0; --i) {
            res = res.Then(Nematode.PaintBody(this.Translate(bodies[i])));
        }
        return res.Then(
            Nematode.PaintHead(this.Translate(this.snake.Head())));
    }
    AddFood(food: Food): void {
        this.foods.Push(food);
    }
    MoveSnake(): void {
        this.snake.Move(this.bound);
        this.TryEatFood();
    }
    SnakeGrow(): void {
        this.snake.Grow(this.bound);
    }
    SnakeShrink(): void {
        this.snake.Shrink();
    }
    private TryEatFood(): void {
        const foods = this.foods.RemoveIf(f => f.Reachable(this.snake.Head()));
        foods.forEach(f => f.Eat());
    }
    bound: CircularRectBound;
    snake: Nematode;
    foods: List<Food>;
    vision: number;
}
