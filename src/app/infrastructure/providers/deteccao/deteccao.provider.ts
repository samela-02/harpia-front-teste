import { DeteccaoRepository } from "@/application/repositories/deteccao.repository";
import { AdicionarObservacaoDeteccaoUseCase } from "@/application/usecase/deteccao/adicionar-observacao-deteccao.usecase";
import { BuscarDeteccoesUseCase } from "@/application/usecase/deteccao/buscar-deteccoes.usecase";
import { RejeitarDeteccaoUseCase } from "@/application/usecase/deteccao/rejeitar-deteccao.usecase";
import { DeteccaoImplRepository } from "@/infrastructure/repository/deteccao-impl.repository";

export const buscarDeteccoesProvider = {
  provide: BuscarDeteccoesUseCase,
  useFactory: (deteccaoRepository: DeteccaoRepository) => new BuscarDeteccoesUseCase(deteccaoRepository),
  deps: [DeteccaoRepository]
}

export const rejeitarDetecaoProvider = {
  provide: RejeitarDeteccaoUseCase,
  useFactory: (deteccaoRepository: DeteccaoRepository) => new RejeitarDeteccaoUseCase(deteccaoRepository),
  deps: [DeteccaoRepository]
}

export const adicionarObservacaoDeteccaoProvider = {
  provide: AdicionarObservacaoDeteccaoUseCase,
  useFactory: (deteccaorepository: DeteccaoRepository) => new AdicionarObservacaoDeteccaoUseCase(deteccaorepository),
  deps: [DeteccaoRepository]
}

export const deteccaoProviders = [
  buscarDeteccoesProvider,
  rejeitarDetecaoProvider,
  adicionarObservacaoDeteccaoProvider,
  {
    provide: DeteccaoRepository,
    useClass: DeteccaoImplRepository
  }
]
