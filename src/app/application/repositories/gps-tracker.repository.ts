import { EventSourceMessage } from "@microsoft/fetch-event-source";
import { Observable } from "rxjs";

export abstract class GpsTrackerRepository {
  public abstract buscarDadosGps(idInstituicao: string): Observable<EventSourceMessage>;
}