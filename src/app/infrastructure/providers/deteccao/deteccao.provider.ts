import { DeteccaoRepository } from "@/application/repositories/deteccao.repository";
import { BuscarDeteccoesUseCase } from "@/application/usecase/deteccao/buscar-deteccoes.usecase";
import { DeteccaoImplRepository } from "@/infrastructure/repository/deteccao-impl.repository";

export const buscarDeteccoesProvider = {
  provide: BuscarDeteccoesUseCase,
  useFactory: (deteccaoRepository: DeteccaoRepository) => new BuscarDeteccoesUseCase(deteccaoRepository),
  deps: [DeteccaoRepository]
}

export const deteccaoProviders = [
  buscarDeteccoesProvider,
  {
    provide: DeteccaoRepository,
    useClass: DeteccaoImplRepository
  }
]
