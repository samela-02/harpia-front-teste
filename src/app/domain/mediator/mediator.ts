import { EventoMediator } from "../enums/evento-mediator";
import { MediatorObserver } from "../observer/mediator-observer";

export class Mediator {
    private observerMap: Map<EventoMediator, MediatorObserver[]> = new Map;

    public registrarEvento(eventoMediator: EventoMediator, observer: MediatorObserver): void {
        const observers: MediatorObserver[] = this.getObserversDoEvento(eventoMediator);
        observers.push(observer);
    }

    public emitirEvento(eventoMediator: EventoMediator, data?: any): void {
        const observers: MediatorObserver[] = this.getObserversDoEvento(eventoMediator);
        observers.forEach(observer => observer.onEvent(eventoMediator, data));
    }

    public removerRegistroDoEvento(eventoMediator: EventoMediator, observer: MediatorObserver): void {
        let observers: MediatorObserver[] = this.getObserversDoEvento(eventoMediator);
        observers = observers.filter(observerDoArray => observerDoArray.getObserverId() != observer.getObserverId())
        this.atualizarObserversDoEvento(eventoMediator, observers);
    }

    private getObserversDoEvento(eventoMediator: EventoMediator): MediatorObserver[] {
        let observers: MediatorObserver[] = this.observerMap.get(eventoMediator);
        if (!observers) {
            observers = []
            this.observerMap.set(eventoMediator, observers);
        }
        return observers;
    }

    private atualizarObserversDoEvento(eventoMediator: EventoMediator, observers: MediatorObserver[]) {
        this.observerMap.set(eventoMediator, observers);
    }
}