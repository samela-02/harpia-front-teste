import { Mediator } from "@/domain/mediator/mediator";

export const modalMediatorProvider = {
    provide: Mediator,
    useFactory: () => new Mediator()
}

export const mediatorProviders = [
    modalMediatorProvider
]