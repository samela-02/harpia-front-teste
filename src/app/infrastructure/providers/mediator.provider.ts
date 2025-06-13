import { Mediator } from "@/domain/mediator/mediator";

export const mediatorProvider = {
    provide: Mediator,
    useFactory: () => new Mediator()
}

export const mediatorProviders = [
    mediatorProvider
]