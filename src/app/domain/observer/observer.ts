export interface Observer {
    onEvent(data: any): void;
    getObserverId(): string;
}