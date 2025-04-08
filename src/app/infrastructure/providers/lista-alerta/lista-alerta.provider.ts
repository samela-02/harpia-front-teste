import { ListaAlertaRepository } from "@/application/repositories/lista-alerta.repository";
import { BuscarListaAlertaUseCase } from "@/application/usecase/lista-alerta/buscar-lista-alertas.usecase";
import { CriarListaAlertaUseCase } from "@/application/usecase/lista-alerta/criar-lista-alerta.usecase";
import { DesativarListaAlertaUseCase } from "@/application/usecase/lista-alerta/desativar-lista-alerta.usecase";
import { EditarListaAlertaUseCase } from "@/application/usecase/lista-alerta/editar-lista-alerta.usecase";
import { ListaAlertaRepositoryImpl } from "@/infrastructure/repository/lista-alerta-impl.repository";

export const criarListaAlertaProvider = {
  provide: CriarListaAlertaUseCase,
  useFactory: (listaAlertaRepository: ListaAlertaRepository) => new CriarListaAlertaUseCase(listaAlertaRepository),
  deps: [ListaAlertaRepository]
}

export const editarListaAlertaProvider = {
  provide: EditarListaAlertaUseCase,
  useFactory: (listaAlertaRepository: ListaAlertaRepository) => new EditarListaAlertaUseCase(listaAlertaRepository),
  deps: [ListaAlertaRepository]
}

export const desativarListaAlertaProvider = {
  provide: DesativarListaAlertaUseCase,
  useFactory: (listaAlertaRepository: ListaAlertaRepository) => new DesativarListaAlertaUseCase(listaAlertaRepository),
  deps: [ListaAlertaRepository]
}

export const buscarListaAlertasProvider = {
  provide: BuscarListaAlertaUseCase,
  useFactory: (listaAlertaRepository: ListaAlertaRepository) => new BuscarListaAlertaUseCase(listaAlertaRepository),
  deps: [ListaAlertaRepository]
}

export const listaAlertaProviders = [
  criarListaAlertaProvider,
  buscarListaAlertasProvider,
  editarListaAlertaProvider,
  desativarListaAlertaProvider,
  {
    provide: ListaAlertaRepository,
    useClass: ListaAlertaRepositoryImpl
  }
]
