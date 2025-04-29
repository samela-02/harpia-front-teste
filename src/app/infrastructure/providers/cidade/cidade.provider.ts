import { CidadeRepository } from "@/application/repositories/cidade.repository";
import { FindCidadesUseCase } from "@/application/usecase/cidade/find-cidades.usecase";
import { CidadeRepositoryImpl } from "@/infrastructure/repository/cidade-repository-impl";
import { Client } from "@tivic-team/tivic-ui";

export const cidadeRepositoryProvider = {
    provide: CidadeRepository,
    useFactory: (client: Client) => new CidadeRepositoryImpl(client),
    deps: [Client]
}

export const findCidadesUseCaseProvider = {
    provide: FindCidadesUseCase,
    useFactory: (cidadeRepository: CidadeRepository) => new FindCidadesUseCase(cidadeRepository),
    deps: [CidadeRepository]
}

export const cidadeProviders = [
    cidadeRepositoryProvider,
    findCidadesUseCaseProvider
]