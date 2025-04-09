import { TipoAlertaRepository } from "@/application/repositories/tipo-alerta.repository";
import { BuscarTipoAlertaPeloCdUseCase } from "@/application/usecase/tipo-alerta/buscar-tipo-alerta-pelo-cd.usecase";
import { BuscarTiposAlertasUseCase } from "@/application/usecase/tipo-alerta/buscar-tipos-alertas.usecase";
import { CriarTipoAlertaUseCase } from "@/application/usecase/tipo-alerta/criar-tipo-alerta.usecase";
import { DesativarTipoAlertaUseCase } from "@/application/usecase/tipo-alerta/desativar-tipo-alerta..usecase";
import { EditarTipoAlertaUseCase } from "@/application/usecase/tipo-alerta/editar-tipo-alerta.usecase";
import { TipoAlertaRepositoryImpl } from "@/infrastructure/repository/tipo-alerta-impl.repository";

export const criaTipoAlertaProvider = {
  provide: CriarTipoAlertaUseCase,
  useFactory: (TipoAlertaRepository: TipoAlertaRepository) => new CriarTipoAlertaUseCase(TipoAlertaRepository),
  deps: [TipoAlertaRepository]
}

export const editaTipoAlertaProvider = {
  provide: EditarTipoAlertaUseCase,
  useFactory: (TipoAlertaRepository: TipoAlertaRepository) => new EditarTipoAlertaUseCase(TipoAlertaRepository),
  deps: [TipoAlertaRepository]
}

export const desativaTipoAlertaProvider = {
  provide: DesativarTipoAlertaUseCase,
  useFactory: (TipoAlertaRepository: TipoAlertaRepository) => new DesativarTipoAlertaUseCase(TipoAlertaRepository),
  deps: [TipoAlertaRepository]
}

export const buscaTipoAlertasProvider = {
  provide: BuscarTiposAlertasUseCase,
  useFactory: (TipoAlertaRepository: TipoAlertaRepository) => new BuscarTiposAlertasUseCase(TipoAlertaRepository),
  deps: [TipoAlertaRepository]
}

export const buscaTipoAlertaPeloCdProvider = {
  provide: BuscarTipoAlertaPeloCdUseCase,
  useFactory: (TipoAlertaRepository: TipoAlertaRepository) => new BuscarTipoAlertaPeloCdUseCase(TipoAlertaRepository),
  deps: [TipoAlertaRepository]
}

export const tipoAlertaProviders = [
  criaTipoAlertaProvider,
  buscaTipoAlertasProvider,
  buscaTipoAlertaPeloCdProvider,
  editaTipoAlertaProvider,
  desativaTipoAlertaProvider,
  {
    provide: TipoAlertaRepository,
    useClass: TipoAlertaRepositoryImpl
  }
]
