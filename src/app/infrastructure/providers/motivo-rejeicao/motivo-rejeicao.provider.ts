import { MotivoRejeicaoRepository } from "@/application/repositories/motivo-rejeicao.repository";
import { FindMotivoRejeicaoUseCase } from "@/application/usecase/motivo-rejeicao/find-motivo-rejeicao.usecase";
import { MotivoRejeicaoRepositoryImpl } from "@/infrastructure/repository/motivo-rejeicao.repository";
import { Client } from "@tivic-team/tivic-ui";

export const motivoRejeicaoRepositoryProvider = {
    provide: MotivoRejeicaoRepository,
    useFactory: (client: Client) => new MotivoRejeicaoRepositoryImpl(client),
    deps: [Client]
}

export const findMotivoRejeicaoUseCaseProvider = {
    provide: FindMotivoRejeicaoUseCase,
    useFactory: (motivoRejeicaoRepository: MotivoRejeicaoRepository) => new FindMotivoRejeicaoUseCase(motivoRejeicaoRepository),
    deps: [MotivoRejeicaoRepository]
}

export const motivoRejeicaoProviders = [
    motivoRejeicaoRepositoryProvider,
    findMotivoRejeicaoUseCaseProvider
]