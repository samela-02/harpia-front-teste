import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { ComponenteRepository } from "@/application/repositories/componente.repository";
import { ComponentesFilter } from "@/domain/filters/componente/componente.filter";
import { Componente } from "@/domain/models/command/componentes";
import { inject } from "@angular/core";
import { Client } from "@tivic-team/tivic-ui";
import { Observable } from "rxjs";

export class ComponenteRepositoryImpl implements ComponenteRepository {
  private _client = inject(Client);
  private readonly _api = "componentes";

  criarComponente(lista: Componente): Observable<void> {
    return this._client.post(this._api, lista)
   }

  editarComponente(cdComponente: number, tipoComponente: Componente): Observable<void> {
    return this._client.put(`${this._api}/${cdComponente}`, tipoComponente)
   }

  buscarComponentes(filter?: ComponentesFilter): Observable<ResponseData<ResponsePaginacao<Componente>>> {
    return this._client.get(this._api, filter.getFilters()) as Observable<ResponseData<ResponsePaginacao<Componente>>>
   }

  desativarComponente(cdComponente: number): Observable<void> {
    return this._client.patch(`${this._api}/${cdComponente}`, null)
   }
}
