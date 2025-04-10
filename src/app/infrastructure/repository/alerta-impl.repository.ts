import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { AlertaRepository } from "@/application/repositories/alerta.repository";
import { AlertaFilter } from "@/domain/filters/alerta/alerta.filter";
import { Alerta } from "@/domain/models/command/alerta";
import { AlertaQueryResponse } from "@/domain/models/query/alerta-query-response";
import { inject } from "@angular/core";
import { Client } from "@tivic-team/tivic-ui";
import { Observable } from "rxjs";

export class AlertaRepositoryImpl implements AlertaRepository {

  private _client = inject(Client);
  private readonly _api = "alertas";

  criarAlerta(lista: Alerta): Observable<void> {
    return this._client.post(this._api, lista)
   }

  editarAlerta(cdAlerta: number, alerta: Alerta): Observable<void> {
    return this._client.put(`${this._api}/${cdAlerta}`, alerta)
   }

  buscarAlertas(filter?: AlertaFilter): Observable<ResponseData<ResponsePaginacao<AlertaQueryResponse>>> {
    return this._client.get(this._api, filter.getFilters()) as Observable<ResponseData<ResponsePaginacao<AlertaQueryResponse>>>
   }

  desativarAlerta(cdAlerta: number): Observable<void> {
    return this._client.patch(`${this._api}/${cdAlerta}`, null)
   }

}
