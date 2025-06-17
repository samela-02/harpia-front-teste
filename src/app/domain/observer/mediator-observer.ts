import { MediatorEvento } from "../enums/mediator-evento";

export interface MediatorObserver {
    onEvent(eventoMediator: MediatorEvento, data: any): void;
    getObserverId(): string;
}