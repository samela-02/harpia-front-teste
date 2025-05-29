import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { EquipamentoRepository } from "@/application/repositories/equipamento.repository";
import { EquipamentosFilter } from "@/domain/filters/equipamento/equipamento.filter";
import { Equipamento } from "@/domain/models/command/equipamento";
import { EquipamentoQuery } from "@/domain/models/query/equipamento";
import { inject } from "@angular/core";
import { environment } from "@env/environment.development";
import { EventSourceMessage, fetchEventSource } from "@microsoft/fetch-event-source";
import { Client } from "@tivic-team/tivic-ui";
import { Observable, of, tap } from "rxjs";
import { AuthServiceImpl } from "../services/auth.service-impl";

export class EquipamentoRepositoryImpl implements EquipamentoRepository {
  private api = `${environment.protocol}://${environment.host}:${environment.port}/${environment.context}/${environment.apiroot}`;
  private _authService = inject(AuthServiceImpl);

  private _client = inject(Client);
  private readonly _api = "equipamentos";

  criarEquipamento(lista: Equipamento): Observable<void> {
    return this._client.post(this._api, lista)
  }

  editarEquipamento(cdEquipamento: number, tipoEquipamento: Equipamento): Observable<void> {
    return this._client.put(`${this._api}/${cdEquipamento}`, tipoEquipamento)
  }

  buscarEquipamentos(filter?: EquipamentosFilter): Observable<ResponseData<ResponsePaginacao<EquipamentoQuery>>> {
    return this._client.get(this._api, filter.getFilters()) as Observable<ResponseData<ResponsePaginacao<EquipamentoQuery>>>
  }

  desativarEquipamento(cdEquipamento: number): Observable<void> {
    return this._client.patch(`${this._api}/${cdEquipamento}`, null)
  }

  alocarEquipamento(cdEquipamento: number, cdVeiculo: number): Observable<void> {
    return this._client.post(`${this._api}/${cdEquipamento}/alocacoes?cdVeiculo=${cdVeiculo}`, null)
  }
  desalocarEquipamento(cdEquipamento: number): Observable<void> {
    return this._client.patch(`${this._api}/${cdEquipamento}/alocacoes`, null)
  }

  findStreamUltimaComunicacaoEquipamento(abortController: AbortController): Observable<EventSourceMessage> {
    return new Observable<EventSourceMessage>(observer => {
      const token = this._authService.getToken()
      fetchEventSource(`${this.api}/equipamentos/stream-ultima-comunicacao`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        signal: abortController.signal,
        onmessage(event) {
          observer.next(event);
        },
        onerror(error) {
          console.error("Erro ao buscar dados da última comunicação.", error);
          observer.error(error);
          throw new Error()
        },
        onclose() {
          console.info("Conexão da stream de última comunicação fechada.")
          observer.complete();
        }
      })
    });
  }
}
