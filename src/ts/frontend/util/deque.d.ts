// declaration file for npm module: double-ended-queue

declare class Deque<A> {
    constructor();
    constructor(as: A[]);
    constructor(capacity: number);

    push(...as: A[]): void;
    unshift(...as: A[]): void;
    pop(): A;
    shift(): A;
    toArray(): A[];
    peekBack(): A;
    peekFront(): A;
    get(index: number): A;
    isEmpty(): Boolean;
    clear(): void;

    length: number;
}