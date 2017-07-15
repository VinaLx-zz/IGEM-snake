/// <reference path="../../util/vector.ts" />

interface Layer {
    // important event handlers
    OnHold(pos: Vector): void;
    OnClick(pos: Vector): void;
    OnKeyPress(key: number): void;
    OnKeyHold(key: number): void;
    OnWindowResize(width: number, height: number): void;

    Draw(context: CanvasRenderingContext2D, time: number): void;
}