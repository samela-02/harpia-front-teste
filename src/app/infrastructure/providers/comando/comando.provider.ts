import { ComandoRepository } from "@/application/repositories/comando.repository"
import { BuscarComandoUseCase } from "@/application/usecase/comando/buscar-comando.usecase"
import { BuscarUltimoSnapshotUseCase } from "@/application/usecase/comando/buscar-ultimo-snapshot.usecase"
import { SolicitarSnapshotUseCase } from "@/application/usecase/comando/solicitar-snapshot.usecase"
import { SolicitarStreamUseCase } from "@/application/usecase/comando/solicitar-stream.usecase"
import { ComandoRepositoryImpl } from "@/infrastructure/repository/comando-impl.repository"

export const enviarWebRtcProvider = {
  provide: SolicitarStreamUseCase,
  useFactory: (comandoRepository: ComandoRepository) => new SolicitarStreamUseCase(comandoRepository),
  deps: [ComandoRepository]
}

export const enviarSnapshotProvider = {
  provide: SolicitarSnapshotUseCase,
  useFactory: (comandoRepository: ComandoRepository) => new SolicitarSnapshotUseCase(comandoRepository),
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
  enviarSnapshotProvider,
  enviarWebRtcProvider,
  buscarComandoProvider,
  buscarUltimoSnapshot,
  {
    provide: ComandoRepository,
    useClass: ComandoRepositoryImpl
  }
]
