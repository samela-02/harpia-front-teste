import { ComandoRepository } from "@/application/repositories/comando.repository"
import { BuscarComandoUseCase } from "@/application/usecase/comando/buscar-comando.usecase"
import { BuscarUltimoSnapshotUseCase } from "@/application/usecase/comando/buscar-ultimo-snapshot.usecase"
import { EnviarComandoUseCase } from "@/application/usecase/comando/enviar-comando.usecase"
import { ComandoRepositoryImpl } from "@/infrastructure/repository/comando-impl.repository"

export const enviarComandoProvider = {
  provide: EnviarComandoUseCase,
  useFactory: (comandoRepository: ComandoRepository) => new EnviarComandoUseCase(comandoRepository),
  deps: [ComandoRepository]
}

export const buscarComandoProvider = {
  provide: BuscarComandoUseCase,
  useFactory: (comandoRepository: ComandoRepository) => new BuscarComandoUseCase(comandoRepository),
  deps: [ComandoRepository]
}

export const buscarUltimoSnapshot = {
  provide: BuscarUltimoSnapshotUseCase,
  useFactory: (comandoRepository: ComandoRepository) => new BuscarUltimoSnapshotUseCase(comandoRepository),
  deps: [ComandoRepository]
}


export const comandoProviders = [
  enviarComandoProvider,
  buscarComandoProvider,
  buscarUltimoSnapshot,
  {
    provide: ComandoRepository,
    useClass: ComandoRepositoryImpl
  }
]
