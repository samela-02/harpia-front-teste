import { GpsTrackerRepository } from "@/application/repositories/gps-tracker.repository";
import { inject } from "@angular/core";
import { EventSourceMessage, fetchEventSource } from '@microsoft/fetch-event-source';
import { Observable } from "rxjs";
import { AuthServiceImpl } from "../services/auth.service-impl";
import { environmentTelemetriaMs } from "@env/environment.development";
export class GpsTrackerRepositoryImpl implements GpsTrackerRepository {
  private api = environmentTelemetriaMs;
  private _authService = inject(AuthServiceImpl);

  buscarDadosGps(idInstituicao: string): Observable<EventSourceMessage> {
    return new Observable<EventSourceMessage>(observer => {
      const token = this._authService.getToken()
      fetchEventSource(`${this.api}/gps?idInstituicao=${idInstituicao}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        onmessage(event) {
            observer.next(event);
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