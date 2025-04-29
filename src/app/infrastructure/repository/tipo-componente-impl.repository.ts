import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { TipoComponenteRepository } from "@/application/repositories/tipo-componente.repository";
import { TiposComponentesFilter } from "@/domain/filters/tipo-componente/tipo-componente.filter";
import { TipoComponente } from "@/domain/models/command/tipo-componente";
import { inject } from "@angular/core";
import { Client } from "@tivic-team/tivic-ui";
import { Observable } from "rxjs";

export class TipoComponenteRepositoryImpl implements TipoComponenteRepository {

  private _client = inject(Client);
  private readonly _api = "tipo-componente";

  criarTipoComponente(lista: TipoComponente): Observable<void> {
    return this._client.post(this._api, lista)
   }

  editarTipoComponente(cdTipoComponente: number, tipoComponente: TipoComponente): Observable<void> {
    return this._client.put(`${this._api}/${cdTipoComponente}`, tipoComponente)
   }

  buscarTipoComponentes(filter?: TiposComponentesFilter): Observable<ResponseData<ResponsePaginacao<TipoComponente>>> {
    return this._client.get(this._api, filter.getFilters()) as Observable<ResponseData<ResponsePaginacao<TipoComponente>>>
   }

  desativarTipoComponente(cdTipoComponente: number): Observable<void> {
    return this._client.patch(`${this._api}/${cdTipoComponente}`, null)
   }

}
