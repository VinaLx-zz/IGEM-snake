/// <reference path="../../util/vector.ts" />

interface Layer {
    eventDispatcher: EventDispatcher;
    Draw(context: CanvasRenderingContext2D, time: number): void;
}