import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { TipoAlertaRepository } from "@/application/repositories/tipo-alerta.repository";
import { TipoAlertaFilter } from "@/domain/filters/tipo-alerta/tipo-alerta.filter";
import { TipoAlerta } from "@/domain/models/command/tipo-alerta";
import { TipoAlertaQueryResponse } from "@/domain/models/query/tipo-alerta-query-response";
import { inject } from "@angular/core";
import { Client } from "@tivic-team/tivic-ui";
import { Observable } from "rxjs";

export class TipoAlertaRepositoryImpl implements TipoAlertaRepository {

  private _client = inject(Client);
  private readonly _api = "tipo-alerta";

  criarTipoAlerta(lista: TipoAlerta): Observable<void> {
    return this._client.post(this._api, lista)
   }

  editarTipoAlerta(cdTipoAlerta: number, tipoAlerta: TipoAlerta): Observable<void> {
    return this._client.put(`${this._api}/${cdTipoAlerta}`, tipoAlerta)
   }

  buscarTiposAlertas(filter?: TipoAlertaFilter): Observable<ResponseData<ResponsePaginacao<TipoAlertaQueryResponse>>> {
    return this._client.get(this._api, filter.getFilters()) as Observable<ResponseData<ResponsePaginacao<TipoAlertaQueryResponse>>>
   }

  buscarTipoAlertaPeloCd(cdTipoAlerta: number): Observable<ResponseData<TipoAlertaQueryResponse>> {
    return this._client.get(`${this._api}/${cdTipoAlerta}`) as Observable<ResponseData<TipoAlertaQueryResponse>>
  }

  desativarTipoAlerta(cdTipoAlerta: number): Observable<void> {
    return this._client.patch(`${this._api}/${cdTipoAlerta}`, null)
   }

}
