import { CriarTipoEquipamentoUseCase } from "@/application/usecase/tipo-equipamento/criar-tipo-equipamento.usecase";
import { EditarTipoEquipamentoUseCase } from "@/application/usecase/tipo-equipamento/editar-tipo-equipamento.usecase";
import { TipoEquipamentoRepository } from "@/application/repositories/tipo-equipamento.repository";
import { DesativarTipoEquipamentoUseCase } from "@/application/usecase/tipo-equipamento/desativar-tipo-equipamento..usecase";
import { BuscarTiposEquipamentosUseCase } from "@/application/usecase/tipo-equipamento/buscar-tipos-equipamentos.usecase";
import { TipoEquipamentoRepositoryImpl } from "@/infrastructure/repository/tipo-equipamento-impl.repository";

export const criaTipoEquipamentoProvider = {
  provide: CriarTipoEquipamentoUseCase,
  useFactory: (TipoEquipamentoRepository: TipoEquipamentoRepository) => new CriarTipoEquipamentoUseCase(TipoEquipamentoRepository),
  deps: [TipoEquipamentoRepository]
}

export const editaTipoEquipamentoProvider = {
  provide: EditarTipoEquipamentoUseCase,
  useFactory: (TipoEquipamentoRepository: TipoEquipamentoRepository) => new EditarTipoEquipamentoUseCase(TipoEquipamentoRepository),
  deps: [TipoEquipamentoRepository]
}

export const desativaTipoEquipamentoProvider = {
  provide: DesativarTipoEquipamentoUseCase,
  useFactory: (TipoEquipamentoRepository: TipoEquipamentoRepository) => new DesativarTipoEquipamentoUseCase(TipoEquipamentoRepository),
  deps: [TipoEquipamentoRepository]
}

export const buscaTipoEquipamentosProvider = {
  provide: BuscarTiposEquipamentosUseCase,
  useFactory: (TipoEquipamentoRepository: TipoEquipamentoRepository) => new BuscarTiposEquipamentosUseCase(TipoEquipamentoRepository),
  deps: [TipoEquipamentoRepository]
}

export const tipoEquipamentoProviders = [
  criaTipoEquipamentoProvider,
  buscaTipoEquipamentosProvider,
  editaTipoEquipamentoProvider,
  desativaTipoEquipamentoProvider,
  {
    provide: TipoEquipamentoRepository,
    useClass: TipoEquipamentoRepositoryImpl
  }
]
