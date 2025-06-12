import { EventosModal as EventoModal } from "../enums/evento-modal";
import { Observer } from "../observer/observer";

export class ModalMediator {
    private observerMap: Map<EventoModal, Observer[]> = new Map;

    public registrarEvento(eventoModal: EventoModal, observer: Observer): void {
        const observers: Observer[] = this.getObserversDoEvento(eventoModal);
        observers.push(observer);
    }

    public emitirEvento(eventoModal: EventoModal): void {
        const observers: Observer[] = this.getObserversDoEvento(eventoModal);
        observers.forEach(observer => observer.onEvent(null));
    }

    private getObserversDoEvento(eventoModal: EventoModal): Observer[] {
        let observers: Observer[] = this.observerMap.get(eventoModal);
        if (!observers) {
            observers = []
            this.observerMap.set(eventoModal, observers);
        }
        return observers;
    }
}