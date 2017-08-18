/// <reference path="./tutorial-layer/tutorial-layer-configs.ts" />
/// <reference path="./tutorial-layer/tutorial-target.ts" />
/// <reference path="../game-control/layer-control.ts" />
/// <reference path="./game-layer.ts" />

namespace Tutorial {
    function StartIntroImages(): Painter[] {
        return [
            Paint.Picture(
                IMG.TUTORIAL.start,
                SZ.TUTORIAL.START_X, SZ.TUTORIAL.START_Y,
                SZ.TUTORIAL.START_W, SZ.TUTORIAL.START_H),
            Paint.Picture(
                IMG.TUTORIAL.move,
                SZ.TUTORIAL.MOVE_X, SZ.TUTORIAL.MOVE_Y,
                SZ.TUTORIAL.MOVE_W, SZ.TUTORIAL.MOVE_H)]
    }
    function EnergyIntroImages(): Painter[] {
        return [
            Paint.Picture(
                IMG.TUTORIAL.energy,
                SZ.TUTORIAL.ENERGY_X, SZ.TUTORIAL.ENERGY_Y,
                SZ.TUTORIAL.ENERGY_W, SZ.TUTORIAL.ENERGY_H)]
    }
    function PreRedImages(): Painter[] {
        return [
            Paint.Picture(
                IMG.TUTORIAL.energyPost,
                SZ.TUTORIAL.ENERGY_POST_X, SZ.TUTORIAL.ENERGY_POST_Y,
                SZ.TUTORIAL.ENERGY_POST_W, SZ.TUTORIAL.ENERGY_POST_H),
            Paint.Picture(
                IMG.TUTORIAL.energyPost2,
                SZ.TUTORIAL.ENERGY_POST2_X, SZ.TUTORIAL.ENERGY_POST2_Y,
                SZ.TUTORIAL.ENERGY_POST2_W, SZ.TUTORIAL.ENERGY_POST2_H),
            Paint.Picture(
                IMG.TUTORIAL.geneticCircuits,
                SZ.TUTORIAL.GENETIC_CIRCUIT_X, SZ.TUTORIAL.GENETIC_CIRCUIT_Y,
                SZ.TUTORIAL.GENETIC_CIRCUIT_W, SZ.TUTORIAL.GENETIC_CIRCUIT_H),
            Paint.Picture(
                IMG.TUTORIAL.geneticCircuits2,
                SZ.TUTORIAL.GENETIC_CIRCUIT2_X, SZ.TUTORIAL.GENETIC_CIRCUIT2_Y,
                SZ.TUTORIAL.GENETIC_CIRCUIT2_W, SZ.TUTORIAL.GENETIC_CIRCUIT2_H)]
    }
    function RedIntroImages(): Painter[] {
        return [
            Paint.Picture(
                IMG.TUTORIAL.red,
                SZ.TUTORIAL.RED_X, SZ.TUTORIAL.RED_Y,
                SZ.TUTORIAL.RED_W, SZ.TUTORIAL.RED_H)
        ]
    }
    function RedIntro(control: LayerControl, tutorial: GameLayer): TutorialPage {
        return MakeTutorialPage(control, () => {
            tutorial.State().GenerateTarget(food.Color.RED);
            control.PushLayer(
                MakeTutorialPage(
                    control, () => tutorial.Start(), ...RedIntroImages()));
        }, ...PreRedImages());
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
        }, ...EnergyIntroImages());
    }
    let timeOutFlag: NodeJS.Timer | null = null;
    function StartIntro(
        control: LayerControl, tutorial: GameLayer): TutorialPage {
        return MakeTutorialPage(control, () => {
            tutorial.Start();
            timeOutFlag = setTimeout(() => {
                timeOutFlag = null;
                tutorial.Pause();
                control.PushLayer(EnergyIntro(control, tutorial));
            }, 5000);
        }, ...StartIntroImages());
    }
    export function Start(control: LayerControl): void {
        const foodgen = new TutorialFoodGenerator();
        const config = new TutorialConfigs(control, foodgen);
        const tutorial = new GameLayerImpl(
            config, foodgen, control,
            () => Start(control), () => {
                if (timeOutFlag !== null) clearTimeout(timeOutFlag);
            });
        control.PushLayer(tutorial);
        control.PushLayer(StartIntro(control, tutorial));
    }
}
