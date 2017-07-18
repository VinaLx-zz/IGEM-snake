/// <reference path="../../util/vector.ts" />

interface Layer {
    eventDispatcher: EventDispatcher;
    Painter(): Painter;
}