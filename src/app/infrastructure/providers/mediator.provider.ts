import { ModalMediator } from "@/domain/mediator/modal-mediator";

export const modalMediatorProvider = {
    provide: ModalMediator,
    useFactory: () => new ModalMediator()
}

export const mediatorProviders = [
    modalMediatorProvider
]