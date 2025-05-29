import { EventSourceMessage } from "@microsoft/fetch-event-source";
import { Observable } from "rxjs";

export abstract class GpsTrackerRepository {
  public abstract buscarDadosGps(abortController: AbortController, idInstituicao: string): Observable<EventSourceMessage>;
}