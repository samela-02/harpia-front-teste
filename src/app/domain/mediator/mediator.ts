import { MediatorEvento } from "../enums/mediator-evento";
import { MediatorObserver } from "../observer/mediator-observer";

export class Mediator {
    private observerMap: Map<MediatorEvento, MediatorObserver[]> = new Map;

    public registrarEvento(eventoMediator: MediatorEvento, observer: MediatorObserver): void {
        const observers: MediatorObserver[] = this.getObserversDoEvento(eventoMediator);
        observers.push(observer);
    }

    public emitirEvento(eventoMediator: MediatorEvento, data?: any): void {
        const observers: MediatorObserver[] = this.getObserversDoEvento(eventoMediator);
        observers.forEach(observer => observer.onEvent(eventoMediator, data));
    }

    public removerRegistroDoEvento(eventoMediator: MediatorEvento, observer: MediatorObserver): void {
        let observers: MediatorObserver[] = this.getObserversDoEvento(eventoMediator);
        observers = observers.filter(observerDoArray => observerDoArray.getObserverId() != observer.getObserverId())
        this.atualizarObserversDoEvento(eventoMediator, observers);
    }

    private getObserversDoEvento(eventoMediator: MediatorEvento): MediatorObserver[] {
        let observers: MediatorObserver[] = this.observerMap.get(eventoMediator);
        if (!observers) {
            observers = []
            this.observerMap.set(eventoMediator, observers);
        }
        return observers;
    }

    private atualizarObserversDoEvento(eventoMediator: MediatorEvento, observers: MediatorObserver[]) {
        this.observerMap.set(eventoMediator, observers);
    }
}