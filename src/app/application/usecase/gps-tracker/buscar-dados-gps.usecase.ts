import { GpsTrackerRepository } from "@/application/repositories/gps-tracker.repository";
import { EventSourceMessage } from "@microsoft/fetch-event-source";
import { Observable } from "rxjs";

export class buscarDadosGpsUseCase {
  constructor(private gpsTrackerRepository: GpsTrackerRepository){}
  public execute(abortController: AbortController, idInstituicao: string): Observable<EventSourceMessage>{
    return this.gpsTrackerRepository.buscarDadosGps(abortController, idInstituicao)
  }
}