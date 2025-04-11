import { AlertaRepository } from "@/application/repositories/alerta.repository"
import { BuscarAlertasUseCase } from "@/application/usecase/alerta/buscar-alertas.usecase"
import { BuscarVeiculoPorPlacaUseCase } from "@/application/usecase/alerta/buscar-veiculo-por-placa.usecase"
import { CriarAlertaUseCase } from "@/application/usecase/alerta/criar-alerta.usecase"
import { CriarVeiculoUseCase } from "@/application/usecase/alerta/criar-veiculo.usecase"
import { DesativarAlertaUseCase } from "@/application/usecase/alerta/desativar-alerta..usecase"
import { EditarAlertaUseCase } from "@/application/usecase/alerta/editar-alerta.usecase"
import { EditarVeiculoUseCase } from "@/application/usecase/alerta/editar-veiculo.usecase"
import { AlertaRepositoryImpl } from "@/infrastructure/repository/alerta-impl.repository"

export const criaAlertaProvider = {
  provide: CriarAlertaUseCase,
  useFactory: (AlertaRepository: AlertaRepository) => new CriarAlertaUseCase(AlertaRepository),
  deps: [AlertaRepository]
}

export const editaAlertaProvider = {
  provide: EditarAlertaUseCase,
  useFactory: (AlertaRepository: AlertaRepository) => new EditarAlertaUseCase(AlertaRepository),
  deps: [AlertaRepository]
}

export const desativaAlertaProvider = {
  provide: DesativarAlertaUseCase,
  useFactory: (AlertaRepository: AlertaRepository) => new DesativarAlertaUseCase(AlertaRepository),
  deps: [AlertaRepository]
}

export const buscaAlertasProvider = {
  provide: BuscarAlertasUseCase,
  useFactory: (AlertaRepository: AlertaRepository) => new BuscarAlertasUseCase(AlertaRepository),
  deps: [AlertaRepository]
}

export const criarVeiculoProvider = {
  provide: CriarVeiculoUseCase,
  useFactory: (AlertaRepository: AlertaRepository) => new CriarVeiculoUseCase(AlertaRepository),
  deps: [AlertaRepository]
}

export const editarVeiculoProvider = {
  provide: EditarVeiculoUseCase,
  useFactory: (AlertaRepository: AlertaRepository) => new EditarVeiculoUseCase(AlertaRepository),
  deps: [AlertaRepository]
}

export const buscarVeiculoPorPlacaProvider = {
  provide: BuscarVeiculoPorPlacaUseCase,
  useFactory: (AlertaRepository: AlertaRepository) => new BuscarVeiculoPorPlacaUseCase(AlertaRepository),
  deps: [AlertaRepository]
}

export const alertaProviders = [
  criaAlertaProvider,
  buscaAlertasProvider,
  editaAlertaProvider,
  desativaAlertaProvider,
  criarVeiculoProvider,
  buscarVeiculoPorPlacaProvider,
  editarVeiculoProvider,
  {
    provide: AlertaRepository,
    useClass: AlertaRepositoryImpl
  }
]
