import { GpsTrackerRepository } from "@/application/repositories/gps-tracker.repository";
import { inject } from "@angular/core";
import { environmentHarpiaMs } from "@env/environment.development";
import { EventSourceMessage, fetchEventSource } from '@microsoft/fetch-event-source';
import { Observable } from "rxjs";
import { AuthServiceImpl } from "../services/auth.service-impl";
import { GpsTrackerQueryResponse } from "@/domain/models/query/gps-tracker-query-response";
export class GpsTrackerRepositoryImpl implements GpsTrackerRepository {
  private api = environmentHarpiaMs;
  private _authService = inject(AuthServiceImpl);

  buscarDadosGps(idInstituicao: string): Observable<GpsTrackerQueryResponse> {
    return new Observable<GpsTrackerQueryResponse>(observer => {
      const token = this._authService.getToken()
      fetchEventSource(`${this.api}/gps?idInstituicao=${idInstituicao}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        onmessage(event) {
          observer.next(JSON.parse(event.data));
        },
        onerror(error) {
          console.error("Erro ao buscar dados GPS:", error);
          observer.error(error);
        },
        onclose() {
          console.error("Conexão ao serviço GPS fechada.")
        }
      })
    });
  }
}