import { TipoComponenteRepository } from "@/application/repositories/tipo-componente.repository"
import { BuscarTiposComponentesUseCase } from "@/application/usecase/tipo-componente/buscar-tipos-componentes.usecase"
import { CriarTipoComponenteUseCase } from "@/application/usecase/tipo-componente/criar-tipo-componente.usecase"
import { DesativarTipoComponenteUseCase } from "@/application/usecase/tipo-componente/desativar-tipo-componente..usecase"
import { EditarTipoComponenteUseCase } from "@/application/usecase/tipo-componente/editar-tipo-componente.usecase"
import { TipoComponenteRepositoryImpl } from "@/infrastructure/repository/tipo-componente-impl.repository"


export const criaTipoComponenteProvider = {
  provide: CriarTipoComponenteUseCase,
  useFactory: (TipoComponenteRepository: TipoComponenteRepository) => new CriarTipoComponenteUseCase(TipoComponenteRepository),
  deps: [TipoComponenteRepository]
}

export const editaTipoComponenteProvider = {
  provide: EditarTipoComponenteUseCase,
  useFactory: (TipoComponenteRepository: TipoComponenteRepository) => new EditarTipoComponenteUseCase(TipoComponenteRepository),
  deps: [TipoComponenteRepository]
}

export const desativaTipoComponenteProvider = {
  provide: DesativarTipoComponenteUseCase,
  useFactory: (TipoComponenteRepository: TipoComponenteRepository) => new DesativarTipoComponenteUseCase(TipoComponenteRepository),
  deps: [TipoComponenteRepository]
}

export const buscaTipoComponentesProvider = {
  provide: BuscarTiposComponentesUseCase,
  useFactory: (TipoComponenteRepository: TipoComponenteRepository) => new BuscarTiposComponentesUseCase(TipoComponenteRepository),
  deps: [TipoComponenteRepository]
}

export const tipoComponenteProviders = [
  criaTipoComponenteProvider,
  buscaTipoComponentesProvider,
  editaTipoComponenteProvider,
  desativaTipoComponenteProvider,
  {
    provide: TipoComponenteRepository,
    useClass: TipoComponenteRepositoryImpl
  }
]
