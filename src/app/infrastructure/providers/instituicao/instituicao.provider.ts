import { InstituicaoRepository } from "@/application/repositories/instituicao.repository";
import { BuscarInstituicoesUseCase } from "@/application/usecase/instituicao/buscar-instituicoes.usecase";
import { CriarInstituicaoUseCase } from "@/application/usecase/instituicao/criar-instituicao.usecase";
import { DesativarInstituicaoUseCase } from "@/application/usecase/instituicao/desativar-instituicao.usecase";
import { EditarInstituicaoUseCase } from "@/application/usecase/instituicao/editar-instituicao.usecase";
import { InstituicaoRepositoryImpl } from "@/infrastructure/repository/instituicao-impl.repository";

export const criarInstituicaoProvider = {
  provide: CriarInstituicaoUseCase,
  useFactory: (instituicaoRepository: InstituicaoRepository) => new CriarInstituicaoUseCase(instituicaoRepository),
  deps:[InstituicaoRepository]
}

export const editarInstituicaoProvider = {
  provide: EditarInstituicaoUseCase,
  useFactory: (instituicaoRepository: InstituicaoRepository) => new EditarInstituicaoUseCase(instituicaoRepository),
  deps: [InstituicaoRepository]
}

export const desativarInstituicaoProvider = {
  provide: DesativarInstituicaoUseCase,
  useFactory: (instituicaoRepository: InstituicaoRepository) => new DesativarInstituicaoUseCase(instituicaoRepository),
  deps: [InstituicaoRepository]
}

export const buscarInstituicoesProvider = {
  provide: BuscarInstituicoesUseCase,
  useFactory: (instituicaoRepository: InstituicaoRepository) => new BuscarInstituicoesUseCase(instituicaoRepository),
  deps: [InstituicaoRepository]
}

export const instituicaoProviders = [
  criarInstituicaoProvider,
  editarInstituicaoProvider,
  desativarInstituicaoProvider,
  buscarInstituicoesProvider,
  {
    provide: InstituicaoRepository,
    useClass: InstituicaoRepositoryImpl
  }
]
