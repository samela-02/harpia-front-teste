import { InstituicaoRepository } from "@/application/repositories/instituicao.repository";
import { CriarInstituicaoUseCase } from "@/application/usecase/instituicao/criar-instituicao.usecase";
import { InstituicaoRepositoryImpl } from "@/infrastructure/repository/instituicao-impl.repository";

export const criarInstituicaoProvider = {
  provide: CriarInstituicaoUseCase,
  useFactory: (instituicaoRepository: InstituicaoRepository) => new CriarInstituicaoUseCase(instituicaoRepository),
  deps:[InstituicaoRepository]
}

export const instituicaoProviders = [
  criarInstituicaoProvider,
  {
    provide: InstituicaoRepository,
    useClass: InstituicaoRepositoryImpl
  }
]
