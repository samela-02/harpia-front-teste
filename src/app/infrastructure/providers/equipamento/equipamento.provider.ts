import { EquipamentoRepository } from "@/application/repositories/equipamento.repository"
import { BuscarEquipamentosUseCase } from "@/application/usecase/equipamento/buscar-equipamentos.usecase"
import { CriarEquipamentoUseCase } from "@/application/usecase/equipamento/criar-equipamento.usecase"
import { DesativarEquipamentoUseCase } from "@/application/usecase/equipamento/desativar-equipamento..usecase"
import { EditarEquipamentoUseCase } from "@/application/usecase/equipamento/editar-tipo-equipamento.usecase"
import { EquipamentoRepositoryImpl } from "@/infrastructure/repository/equipamento-impl.repository"

export const criaEquipamentoProvider = {
  provide: CriarEquipamentoUseCase,
  useFactory: (equipamentoRepository: EquipamentoRepository) => new CriarEquipamentoUseCase(equipamentoRepository),
  deps: [EquipamentoRepository]
}

export const editaEquipamentoProvider = {
  provide: EditarEquipamentoUseCase,
  useFactory: (equipamentoRepository: EquipamentoRepository) => new EditarEquipamentoUseCase(equipamentoRepository),
  deps: [EquipamentoRepository]
}

export const desativaEquipamentoProvider = {
  provide: DesativarEquipamentoUseCase,
  useFactory: (equipamentoRepository: EquipamentoRepository) => new DesativarEquipamentoUseCase(equipamentoRepository),
  deps: [EquipamentoRepository]
}

export const buscaEquipamentosProvider = {
  provide: BuscarEquipamentosUseCase,
  useFactory: (equipamentoRepository: EquipamentoRepository) => new BuscarEquipamentosUseCase(equipamentoRepository),
  deps: [EquipamentoRepository]
}

export const equipamentoProviders = [
  criaEquipamentoProvider,
  buscaEquipamentosProvider,
  editaEquipamentoProvider,
  desativaEquipamentoProvider,
  {
    provide: EquipamentoRepository,
    useClass: EquipamentoRepositoryImpl
  }
]
