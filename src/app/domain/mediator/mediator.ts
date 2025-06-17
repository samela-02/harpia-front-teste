import { EventoMediator } from "../enums/evento-mediator";
import { Observer } from "../observer/observer";

export class Mediator {
    private observerMap: Map<EventoMediator, Observer[]> = new Map;

    public registrarEvento(eventoMediator: EventoMediator, observer: Observer): void {
        const observers: Observer[] = this.getObserversDoEvento(eventoMediator);
        observers.push(observer);
    }

    public emitirEvento(eventoMediator: EventoMediator, data?: any): void {
        const observers: Observer[] = this.getObserversDoEvento(eventoMediator);
        observers.forEach(observer => observer.onEvent(eventoMediator, data));
    }

    public removerRegistroDoEvento(eventoMediator: EventoMediator, observer: Observer): void {
        let observers: Observer[] = this.getObserversDoEvento(eventoMediator);
        observers = observers.filter(observerDoArray => observerDoArray.getObserverId() != observer.getObserverId())
        this.atualizarObserversDoEvento(eventoMediator, observers);
    }

    private getObserversDoEvento(eventoMediator: EventoMediator): Observer[] {
        let observers: Observer[] = this.observerMap.get(eventoMediator);
        if (!observers) {
            observers = []
            this.observerMap.set(eventoMediator, observers);
        }
        return observers;
    }

    private atualizarObserversDoEvento(eventoMediator: EventoMediator, observers: Observer[]) {
        this.observerMap.set(eventoMediator, observers);
    }
}