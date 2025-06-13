import { EventosMediator } from "../enums/evento-mediator";
import { Observer } from "../observer/observer";

export class Mediator {
    private observerMap: Map<EventosMediator, Observer[]> = new Map;

    public registrarEvento(eventoMediator: EventosMediator, observer: Observer): void {
        const observers: Observer[] = this.getObserversDoEvento(eventoMediator);
        observers.push(observer);
    }

    public emitirEvento(eventoMediator: EventosMediator, data?: any): void {
        const observers: Observer[] = this.getObserversDoEvento(eventoMediator);
        observers.forEach(observer => observer.onEvent(data));
    }

    public removerRegistroDoEvento(eventoMediator: EventosMediator, observer: Observer): void {
        let observers: Observer[] = this.getObserversDoEvento(eventoMediator);
        observers = observers.filter(observerDoArray => observerDoArray.getObserverId() != observer.getObserverId())
        this.atualizarObserversDoEvento(eventoMediator, observers);
    }

    private getObserversDoEvento(eventoMediator: EventosMediator): Observer[] {
        let observers: Observer[] = this.observerMap.get(eventoMediator);
        if (!observers) {
            observers = []
            this.observerMap.set(eventoMediator, observers);
        }
        return observers;
    }

    private atualizarObserversDoEvento(eventoMediator: EventosMediator, observers: Observer[]) {
        this.observerMap.set(eventoMediator, observers);
    }
}