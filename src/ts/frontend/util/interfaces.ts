interface Positioned {
    X(): number;
    Y(): number;
    Position(): Vector;
    Center(): Vector;
}

interface Sized {
    Width(): number;
    Height(): number;
}