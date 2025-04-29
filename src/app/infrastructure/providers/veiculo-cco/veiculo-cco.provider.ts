import { VeiculoCCORepository } from "@/application/repositories/veiculo-cco.repository"
import { BuscarVeiculosCCOUseCase } from "@/application/usecase/veiculo-cco/buscar-veiculos-cco.usecase"
import { CriarVeiculoCCOUseCase } from "@/application/usecase/veiculo-cco/criar-veiculo-cco.usecase"
import { DesativarVeiculoCCOUseCase } from "@/application/usecase/veiculo-cco/desativar-veiculo-cco..usecase"
import { EditarVeiculoCCOUseCase } from "@/application/usecase/veiculo-cco/editar-veiculo-cco.usecase"
import { VeiculoCCORepositoryIml } from "@/infrastructure/repository/veiculo-cco-impl.repository"

export const criaVeiculoCCOProvider = {
  provide: CriarVeiculoCCOUseCase,
  useFactory: (veiculoCCORepository: VeiculoCCORepository) => new CriarVeiculoCCOUseCase(veiculoCCORepository),
  deps: [VeiculoCCORepository]
}

export const editaVeiculoCCOProvider = {
  provide: EditarVeiculoCCOUseCase,
  useFactory: (veiculoCCORepository: VeiculoCCORepository) => new EditarVeiculoCCOUseCase(veiculoCCORepository),
  deps: [VeiculoCCORepository]
}

export const desativaVeiculoCCOProvider = {
  provide: DesativarVeiculoCCOUseCase,
  useFactory: (veiculoCCORepository: VeiculoCCORepository) => new DesativarVeiculoCCOUseCase(veiculoCCORepository),
  deps: [VeiculoCCORepository]
}

export const buscaVeiculoCCOsProvider = {
  provide: BuscarVeiculosCCOUseCase,
  useFactory: (veiculoCCORepository: VeiculoCCORepository) => new BuscarVeiculosCCOUseCase(veiculoCCORepository),
  deps: [VeiculoCCORepository]
}

export const veiculoCCOProviders = [
  criaVeiculoCCOProvider,
  buscaVeiculoCCOsProvider,
  editaVeiculoCCOProvider,
  desativaVeiculoCCOProvider,
  {
    provide: VeiculoCCORepository,
    useClass: VeiculoCCORepositoryIml
  }
]
