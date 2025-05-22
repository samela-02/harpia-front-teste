import { GpsTrackerRepository } from "@/application/repositories/gps-tracker.repository";
import { inject } from "@angular/core";
import { environment } from "@env/environment.development";
import { EventSourceMessage, fetchEventSource } from '@microsoft/fetch-event-source';
import { Observable, of, pipe, tap } from "rxjs";
import { AuthServiceImpl } from "../services/auth.service-impl";
export class GpsTrackerRepositoryImpl implements GpsTrackerRepository {
  private api = `${environment.protocol}://${environment.host}:${environment.port}/${environment.context}/${environment.apiroot}`;
  private _authService = inject(AuthServiceImpl);
  private _eventSourceConnection: EventSourceMessage = null

  buscarDadosGps(idInstituicao: string): Observable<EventSourceMessage> {
    if (this._eventSourceConnection) {
      return of(this._eventSourceConnection)
    }
    return new Observable<EventSourceMessage>(observer => {
      const token = this._authService.getToken()
      fetchEventSource(`${this.api}/sensors?idInstituicao=${idInstituicao}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        onmessage(event) {
          observer.next(event);
        },
        onerror(error) {
          console.error("Erro ao buscar dados GPS:", error);
          observer.error(error);
          throw new Error()
        },
        onclose() {
          console.error("Conexão ao serviço GPS fechada.")
          observer.complete();
        }
      })
    }).pipe(tap(
      response => this._eventSourceConnection = response
    ));
  }
}
