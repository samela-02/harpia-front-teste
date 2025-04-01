import { PastaAlertaRepository } from "@/application/repositories/pasta-alerta.repository";
import { BuscarPastaAlertaUseCase } from "@/application/usecase/pasta-alerta/buscar-pasta-alertas.usecase";
import { CriarPastaAlertaUseCase } from "@/application/usecase/pasta-alerta/criar-pasta-alerta.usecase";
import { DesativarPastaAlertaUseCase } from "@/application/usecase/pasta-alerta/desativar-pasta-alerta.usecase";
import { EditarPastaAlertaUseCase } from "@/application/usecase/pasta-alerta/editar-pasta-alerta.usecase";
import { PastaAlertaRepositoryImpl } from "@/infrastructure/repository/pasta-alerta-impl.repository";

export const criarPastaAlertaProvider = {
  provide: CriarPastaAlertaUseCase,
  useFactory: (pastaAlertaRepository: PastaAlertaRepository) => new CriarPastaAlertaUseCase(pastaAlertaRepository),
  deps: [PastaAlertaRepository]
}

export const editarPastaAlertaProvider = {
  provide: EditarPastaAlertaUseCase,
  useFactory: (pastaAlertaRepository: PastaAlertaRepository) => new EditarPastaAlertaUseCase(pastaAlertaRepository),
  deps: [PastaAlertaRepository]
}

export const desativarPastaAlertaProvider = {
  provide: DesativarPastaAlertaUseCase,
  useFactory: (pastaAlertaRepository: PastaAlertaRepository) => new DesativarPastaAlertaUseCase(pastaAlertaRepository),
  deps: [PastaAlertaRepository]
}

export const buscarPastaAlertasProvider = {
  provide: BuscarPastaAlertaUseCase,
  useFactory: (pastaAlertaRepository: PastaAlertaRepository) => new BuscarPastaAlertaUseCase(pastaAlertaRepository),
  deps: [PastaAlertaRepository]
}

export const instituicaoProviders = [
  criarPastaAlertaProvider,
  buscarPastaAlertasProvider,
  editarPastaAlertaProvider,
  desativarPastaAlertaProvider,
  {
    provide: PastaAlertaRepository,
    useClass: PastaAlertaRepositoryImpl
  }
]
