export abstract class Observer {
    abstract onEvent(data: any): void;
}