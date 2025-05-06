import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { AlertaRepository } from "@/application/repositories/alerta.repository";
import { AlertaFilter } from "@/domain/filters/alerta/alerta.filter";
import { Alerta } from "@/domain/models/command/alerta";
import { Veiculo } from "@/domain/models/command/veiculo-deteccao";
import { AlertaCompletoQueryResponse } from "@/domain/models/query/alerta-completo-query-reponse";
import { AlertaQueryResponse } from "@/domain/models/query/alerta-query-response";
import { VeiculoDeteccaoQueryResponse } from "@/domain/models/query/veiculo-deteccao-query-response";
import { inject } from "@angular/core";
import { Client } from "@tivic-team/tivic-ui";
import { Observable } from "rxjs";

export class AlertaRepositoryImpl implements AlertaRepository {

  private _client = inject(Client);
  private readonly _api = "alertas";

  criarAlerta(lista: Alerta): Observable<any> {
    return this._client.post(this._api, lista)
  }

  editarAlerta(cdAlerta: number, alerta: Alerta): Observable<void> {
    return this._client.put(`${this._api}/${cdAlerta}`, alerta)
  }

  buscarAlertas(filter?: AlertaFilter): Observable<ResponseData<ResponsePaginacao<AlertaQueryResponse>>> {
    return this._client.get(this._api, filter.getFilters()) as Observable<ResponseData<ResponsePaginacao<AlertaQueryResponse>>>
  }

  buscarAlertaPorCd(cdAlerta: number): Observable<ResponseData<AlertaCompletoQueryResponse>> {
    return this._client.get(`${this._api}/${cdAlerta}`) as Observable<ResponseData<AlertaCompletoQueryResponse>>
  }

  desativarAlerta(cdAlerta: number): Observable<void> {
    return this._client.patch(`${this._api}/${cdAlerta}`, null)
  }

  criarVeiculo(veiculo: Veiculo): Observable<void> {
    return this._client.post(`${this._api}/veiculos`, veiculo)
  }
  editarVeiculo(cdVeiculo: number, veiculo: Veiculo): Observable<void> {
    return this._client.put(`${this._api}/veiculos/${cdVeiculo}`, veiculo)
  }
  buscarVeiculoPorPlaca(nrPlaca?: string): Observable<ResponseData<VeiculoDeteccaoQueryResponse>> {
    return this._client.get(`${this._api}/veiculos/${nrPlaca}`) as Observable<ResponseData<VeiculoDeteccaoQueryResponse>>
  }
}
