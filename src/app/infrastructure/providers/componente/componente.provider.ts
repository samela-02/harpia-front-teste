import { ComponenteRepository } from "@/application/repositories/componente.repository"
import { BuscarComponentesUseCase } from "@/application/usecase/componente/buscar-componentes.usecase"
import { CriarComponenteUseCase } from "@/application/usecase/componente/criar-componente.usecase"
import { DesativarComponenteUseCase } from "@/application/usecase/componente/desativar-componente..usecase"
import { EditarComponenteUseCase } from "@/application/usecase/componente/editar-componente.usecase"
import { ComponenteRepositoryImpl } from "@/infrastructure/repository/componente-impl.repository"

export const criaComponenteProvider = {
  provide: CriarComponenteUseCase,
  useFactory: (compoenenteRepository: ComponenteRepository) => new CriarComponenteUseCase(compoenenteRepository),
  deps: [ComponenteRepository]
}

export const editaComponenteProvider = {
  provide: EditarComponenteUseCase,
  useFactory: (compoenenteRepository: ComponenteRepository) => new EditarComponenteUseCase(compoenenteRepository),
  deps: [ComponenteRepository]
}

export const desativaComponenteProvider = {
  provide: DesativarComponenteUseCase,
  useFactory: (compoenenteRepository: ComponenteRepository) => new DesativarComponenteUseCase(compoenenteRepository),
  deps: [ComponenteRepository]
}

export const buscaComponentesProvider = {
  provide: BuscarComponentesUseCase,
  useFactory: (compoenenteRepository: ComponenteRepository) => new BuscarComponentesUseCase(compoenenteRepository),
  deps: [ComponenteRepository]
}

export const compoenenteProviders = [
  criaComponenteProvider,
  buscaComponentesProvider,
  editaComponenteProvider,
  desativaComponenteProvider,
  {
    provide: ComponenteRepository,
    useClass: ComponenteRepositoryImpl
  }
]
