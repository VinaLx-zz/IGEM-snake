/// <reference path="../abstract-layer.ts" />

namespace Tutorial {
    export function MakeTutorialPage(
        control: LayerControl, ...ps: Painter[]): TutorialPage {
        console.assert(ps.length > 0, "tutorial pages need at least 1 painter");
        if (ps.length === 1) return new TutorialPage(ps[0], Func.Noop, control);
        return new TutorialPage(ps[0], () => {
            control.PushLayer(MakeTutorialPage(control, ...ps.slice(1)));
        }, control);
    }
}

class TutorialPage extends AbstractLayer {
    constructor(painter: Painter, cont: () => void, control: LayerControl) {
        super(control, {});
        this.content = painter;
        this.cont = cont;
    }
    Buttons(): MouseEventCatcher {
        return new ClickButton(() => {
            this.control.PopLayer();
            this.cont();
        }, new RectBound(0, 0, 1, SZ.RELATIVE_HEIGHT));
    }
    Painter(): Painter {
        return this.content.Then(this.PaintContinuePrompt());
    }
    private PaintContinuePrompt(): Painter {
        return Paint.Noop();
    }
    content: Painter;
    cont: () => void;
}