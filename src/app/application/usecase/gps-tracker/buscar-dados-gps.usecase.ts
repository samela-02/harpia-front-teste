import { GpsTrackerRepository } from "@/application/repositories/gps-tracker.repository";
import { EventSourceMessage } from "@microsoft/fetch-event-source";
import { Observable } from "rxjs";

export class buscarDadosGpsUseCase {
  constructor(private gpsTrackerRepository: GpsTrackerRepository){}
  public execute(idInstituicao: string): Observable<EventSourceMessage>{
    return this.gpsTrackerRepository.buscarDadosGps(idInstituicao)
  }
}