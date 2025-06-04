import { ComandoRepository } from "@/application/repositories/comando.repository";
import { ComandoDTo } from "@/domain/dtos/comando.dto";
import { inject } from "@angular/core";
import { environment } from "@env/environment.development";
import { EventSourceMessage, fetchEventSource } from "@microsoft/fetch-event-source";
import { Client } from "@tivic-team/tivic-ui";
import { Observable } from "rxjs";
import { AuthServiceImpl } from "../services/auth.service-impl";
import { ResponseData } from "@/application/dtos/response-data.dto";
import { UltimoSnapshotQueryResponse } from "@/domain/models/query/ultimo-snapshot-query-response";

export class ComandoRepositoryImpl implements ComandoRepository {
  private api = `${environment.protocol}://${environment.host}:${environment.port}/${environment.context}/${environment.apiroot}`;
  private _authService = inject(AuthServiceImpl);
  private _client = inject(Client);

  buscarComando(idComando: string): Observable<EventSourceMessage> {
    return new Observable<EventSourceMessage>(observer => {
      const token = this._authService.getToken()
      fetchEventSource(`${this.api}/comandos?idComando=${idComando}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        onmessage(event) {
          observer.next(event);
        },
        onerror(error) {
          console.error("Erro ao buscar comando:", error);
          observer.error(error);
        },
        onclose() {
          console.error("Conexão ao serviço de Comando fechado.")
        }
      })
    });
  }

  enviarComando(comando: ComandoDTo): Observable<void> {
    return this._client.environment(null).post(`${this.api}/comandos`, comando)
  }

  buscarUltimoSnapshot(idEquipamento: String): Observable<ResponseData<UltimoSnapshotQueryResponse>> {
    return this._client.environment(null).get(`${this.api}/comandos/ultimo-snapshot?idEquipamento=${idEquipamento}`) as Observable<ResponseData<UltimoSnapshotQueryResponse>>
  }
}
