import { EventoMediator } from "../enums/evento-mediator";

export interface MediatorObserver {
    onEvent(eventoMediator: EventoMediator, data: any): void;
    getObserverId(): string;
}