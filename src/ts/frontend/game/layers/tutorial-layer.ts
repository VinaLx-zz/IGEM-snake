/// <reference path="./tutorial-layer/tutorial-layer-configs.ts" />
/// <reference path="./tutorial-layer/tutorial-target.ts" />
/// <reference path="../game-control/layer-control.ts" />
/// <reference path="./game-layer.ts" />

namespace Tutorial {
    function RedIntro(control: LayerControl, tutorial: GameLayer): TutorialPage {
        return MakeTutorialPage(control, () => {
            tutorial.State().GenerateTarget(food.Color.RED);
            tutorial.Start();
        }, Paint.BackgroundColor("blue"), Paint.BackgroundColor("red"));
    }
    function EnergyIntro(
        control: LayerControl, tutorial: GameLayer): TutorialPage {
        return MakeTutorialPage(control, () => {
            const state = tutorial.State();
            const snake = state.Snake();
            state.AddEnergy(
                snake.Head().TowardDirection(snake.direction, 0.2),
                () => {
                    tutorial.Pause();
                    control.PushLayer(RedIntro(control, tutorial));
                });
            tutorial.Start();
        }, Paint.BackgroundColor("blue"));
    }
    function StartIntro(
        control: LayerControl, tutorial: GameLayer): TutorialPage {
        return MakeTutorialPage(control, () => {
            tutorial.Start();
            setTimeout(() => {
                tutorial.Pause();
                control.PushLayer(EnergyIntro(control, tutorial));
            }, 5000);
        }, Paint.BackgroundColor("gray"));
    }
    export function Start(control: LayerControl): void {
        const foodgen = new TutorialFoodGenerator();
        const config = new TutorialConfigs(control, foodgen);
        const tutorial = new GameLayerImpl(
            config, foodgen, control,
            g => g.Pause(), g => g.Pause(), () => Start(control));
        control.PushLayer(tutorial);
        control.PushLayer(StartIntro(control, tutorial));
    }
}
