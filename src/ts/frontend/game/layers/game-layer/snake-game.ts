/// <reference path="./snake-game-state.ts" />
/// <reference path="./game-config.ts" />
/// <reference path="../../widgets/genetic-circuit.ts" />
/// <reference path="../../widgets/bar-bar-bar.ts" />
/// <reference path="../../widgets/board.ts" />

class SnakeGame implements SnakeGameState {
    constructor(config: GameConfig) {
        this.board = SnakeGame.MakeBoard(config);
        this.bbb = SnakeGame.MakeBars(this.board, config);
        this.accelerationBar = SnakeGame.MakeAccelerationBar(
            this.board.snake, config);
        this.geneticCircuits = this.MakeGeneticCircuits(config);
        this.config = config;
        for (const adder of config.INIT_FOODS) adder(this);
    }
    Painter(): Painter {
        return this.board.Painter()
            .Then(this.bbb.Painter())
            .Then(this.geneticCircuits.Painter());
    }
    NextState(): void {
        this.board.MoveSnake();
        this.bbb.Decrement();
        this.accelerationBar.decrement();
    }
    Machine(): FoodMachine {
        return this.geneticCircuits;
    }
    AccelerationBar(): AccelerationBar {
        return this.accelerationBar;
    }
    EnergyBar(): EnergyBar {
        return this.bbb.energy;
    }
    VisionBar(): VisionBar {
        return this.bbb.vision;
    }
    VictoryBar(): VictoryBar {
        return this.bbb.victory;
    }
    NextFood(c: food.Color): food.Part | null {
        return this.geneticCircuits.Next(c);
    }
    Snake(): Snake {
        return this.board.snake;
    }
    NumFoodsOnBoard(): number {
        return this.board.foods.Size();
    }
    Win(): Boolean {
        return this.config.Win(this);
    }
    Lose(): Boolean {
        return this.config.Lose(this);
    }
    AddEnergy(pos: Vector, onEaten: () => void): void {
        this.board.AddFood(food.GetEnergy(pos, this.bbb.energy, onEaten));
    }
    AddPart(
        color: food.Color, type: food.Part,
        pos: Vector, onEaten: () => void): void {
        this.board.AddFood(
            food.GetPart(color, type, pos, this.geneticCircuits, onEaten));
    }
    private static MakeBoard(config: GameConfig): Board {
        const bound = new CircularRectBound(
            0, 0, config.BOARD_WIDTH, config.BOARD_HEIGHT);
        const snake = new Nematode(
            config.SNAKE_INIT_POS,
            config.SNAKE_NORMAL_SPEED, config.SNAKE_ACCELERATED_SPEED, bound);
        for (let i = 0; i < config.SNAKE_INIT_LENGTH; ++i) snake.Grow();
        const board = new Board(snake, config.BASIC_VISION);
        return board;
    }
    private static MakeBars(board: Board, config: GameConfig): BarBarBar {
        const energy = new EnergyBar(
            config.LIFE_TIME_INIT, config.LIFE_TIME_PER_UNIT,
            config.ENERGY_TIME_GAIN, config.SECONDS_PER_SNAKE_BODY,
            board.snake);
        const vision = new VisionBar(
            config.BASIC_VISION, config.FULL_VISION, config.VISION_GAIN,
            config.VISION_DEC_PER_SEC, board);
        const victory = new VictoryBar(
            config.TARGET_GAIN, config.TARGET_DEC_PER_SEC, board.snake);
        return new BarBarBar(energy, vision, victory);
    }
    private MakeGeneticCircuits(config: GameConfig): GeneticCircuits {
        return new GeneticCircuits(config.TargetGenerator(this));
    }
    private static MakeAccelerationBar(snake: Nematode, config: GameConfig) {
        return new AccelerationBar(
            config.ACCELERATE_TIME_INIT, config.ACCELERATE_TIME_GAIN,
            config.ACCELERATE_TIME_TOTAL, snake);
    }
    board: Board;
    bbb: BarBarBar;
    accelerationBar: AccelerationBar;
    geneticCircuits: GeneticCircuits;
    config: GameConfig;
}
