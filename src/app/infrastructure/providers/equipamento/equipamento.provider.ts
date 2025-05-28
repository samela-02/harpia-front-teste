import { EquipamentoRepository } from "@/application/repositories/equipamento.repository"
import { AlocarEquipamentoUseCase } from "@/application/usecase/equipamento/alocar-equipamento.usecase"
import { BuscarEquipamentosUseCase } from "@/application/usecase/equipamento/buscar-equipamentos.usecase"
import { CriarEquipamentoUseCase } from "@/application/usecase/equipamento/criar-equipamento.usecase"
import { DesalocarEquipamentoUseCase } from "@/application/usecase/equipamento/desalocar-equipamento.usecase"
import { DesativarEquipamentoUseCase } from "@/application/usecase/equipamento/desativar-equipamento..usecase"
import { EditarEquipamentoUseCase } from "@/application/usecase/equipamento/editar-tipo-equipamento.usecase"
import { FindStreamUltimaComunicacaoEquipamentoUseCase } from "@/application/usecase/equipamento/find-stream-ultima-comunicacao-equipamento.usecase"
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

export const alocarEquipamentoProvider = {
  provide: AlocarEquipamentoUseCase,
  useFactory: (equipamentoRepository: EquipamentoRepository) => new AlocarEquipamentoUseCase(equipamentoRepository),
  deps: [EquipamentoRepository]
}

export const desalocarEquipamentoProvider = {
  provide: DesalocarEquipamentoUseCase,
  useFactory: (equipamentoRepository: EquipamentoRepository) => new DesalocarEquipamentoUseCase(equipamentoRepository),
  deps: [EquipamentoRepository]
}

export const findStreamUltimaComunicacaoEquipamentoProvider = {
  provide: FindStreamUltimaComunicacaoEquipamentoUseCase,
  useFactory: (equipamentoRepository: EquipamentoRepository) => new FindStreamUltimaComunicacaoEquipamentoUseCase(equipamentoRepository),
  deps: [EquipamentoRepository]
}

export const equipamentoProviders = [
  criaEquipamentoProvider,
  buscaEquipamentosProvider,
  editaEquipamentoProvider,
  desativaEquipamentoProvider,
  alocarEquipamentoProvider,
  desalocarEquipamentoProvider,
  findStreamUltimaComunicacaoEquipamentoProvider,
  {
    provide: EquipamentoRepository,
    useClass: EquipamentoRepositoryImpl
  }
]
