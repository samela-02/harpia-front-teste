import { DeteccaoRepository } from "@/application/repositories/deteccao.repository";
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

export const deteccaoProviders = [
  buscarDeteccoesProvider,
  rejeitarDetecaoProvider,
  {
    provide: DeteccaoRepository,
    useClass: DeteccaoImplRepository
  }
]
