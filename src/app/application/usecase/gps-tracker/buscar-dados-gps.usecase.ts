import { GpsTrackerRepository } from "@/application/repositories/gps-tracker.repository";
import { GpsTrackerQueryResponse } from "@/domain/models/query/gps-tracker-query-response";
import { Observable } from "rxjs";

export class buscarDadosGpsUseCase {
  constructor(private gpsTrackerRepository: GpsTrackerRepository){}
  public execute(idInstituicao: string): Observable<GpsTrackerQueryResponse>{
    return this.gpsTrackerRepository.buscarDadosGps(idInstituicao)
  }
}