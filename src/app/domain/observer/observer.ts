import { EventoMediator } from "../enums/evento-mediator";

export interface Observer {
    onEvent(eventoMediator: EventoMediator, data: any): void;
    getObserverId(): string;
}