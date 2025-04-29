import { GpsTrackerRepository } from "@/application/repositories/gps-tracker.repository"
import { buscarDadosGpsUseCase } from "@/application/usecase/gps-tracker/buscar-dados-gps.usecase"
import { GpsTrackerRepositoryImpl } from "@/infrastructure/repository/gps-tracker-impl.repository"

export const buscarDadosGpsProvider = {
  provide: buscarDadosGpsUseCase,
  useFactory: (gpsTrackerRepository: GpsTrackerRepository) => new buscarDadosGpsUseCase(gpsTrackerRepository),
  deps: [GpsTrackerRepository]
}

export const gpsTrackerProviders = [
  buscarDadosGpsProvider,
  {
    provide: GpsTrackerRepository,
    useClass: GpsTrackerRepositoryImpl
  }
]
