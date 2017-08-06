/// <reference path="./snake.ts" />
/// <reference path="./food.ts" />
/// <reference path="../../util/bound.ts" />
/// <reference path="../../util/list.ts" />

class Board {
    constructor(
        snake: Nematode, vision: number, foods: Food[] = []) {
        this.snake = snake;
        this.bound = snake.bound;
        this.foods = List.FromArray(foods);
    }
    Painter(): Painter {
        return Paint.Delay(() =>
            this.PaintFoods().Then(this.PaintSnake()).Then(this.PaintMist()));
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
            res = res.Then(this.snake.PaintBody(this.Translate(bodies[i])));
        }
        return res.Then(
            this.snake.PaintHead(this.Translate(this.snake.Head())));
    }
    private PaintMist(): Painter {
        return new Painter (ctx => {
            const v = ctx.createRadialGradient(
                0.5, SZ.RELATIVE_HEIGHT / 2, this.vision + 0.1,
                0.5, SZ.RELATIVE_HEIGHT / 2, this.vision);
            v.addColorStop(0, "rgba(172, 166, 161, 1)");
            v.addColorStop(1, "rgba(172, 166, 161, 0)");
            ctx.fillStyle = v;
            ctx.fillRect(0, 0, 1, SZ.RELATIVE_HEIGHT);
        })
    }
    AddFood(food: Food): void {
        this.foods.Push(food);
    }
    MoveSnake(): void {
        this.snake.Move();
        this.TryEatFood();
    }
    SnakeGrow(): void {
        this.snake.Grow();
    }
    SnakeShrink(): void {
        this.snake.Shrink();
    }
    private TryEatFood(): void {
        const foods = this.foods.RemoveIf(f => f.Reachable(this.snake.Head()));
        foods.forEach(f => f.Eat());
        this.foodEaten += foods.length;
    }
    bound: AdjustableBound;
    snake: Nematode;
    foods: List<Food>;
    foodEaten: number = 0;
    vision: number = 0;
}
