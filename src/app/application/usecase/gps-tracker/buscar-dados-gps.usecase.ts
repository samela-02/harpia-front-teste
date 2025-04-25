import { GpsTrackerRepository } from "@/application/repositories/gps-tracker.repository";
import { GpsTrackerQueryResponse } from "@/domain/models/query/gps-tracker-query-response";
import { EventSourceMessage } from "@microsoft/fetch-event-source";
import { Observable } from "rxjs";

export class buscarDadosGpsUseCase {
  constructor(private gpsTrackerRepository: GpsTrackerRepository){}
  public execute(idInstituicao: string): Observable<EventSourceMessage>{
    return this.gpsTrackerRepository.buscarDadosGps(idInstituicao)
  }
}