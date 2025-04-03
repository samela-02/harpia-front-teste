import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { TipoEquipamentoRepository } from "@/application/repositories/tipo-equipamento.repository";
import { TipoEquipamentosFilter } from "@/domain/filters/lista-equipamento/tipo-equipamento.filter";
import { TipoEquipamento } from "@/domain/models/tipo-equipamento";
import { inject } from "@angular/core";
import { Client } from "@tivic-team/tivic-ui";
import { Observable } from "rxjs";

export class TipoEquipamentoRepositoryImpl implements TipoEquipamentoRepository {

  private _client = inject(Client);
  private readonly _api = "tipo-equipamento";

  criarTipoEquipamento(lista: TipoEquipamento): Observable<void> {
    return this._client.post(this._api, lista)
   }

  editarTipoEquipamento(cdTipoEquipamento: number, tipoEquipamento: TipoEquipamento): Observable<void> {
    return this._client.put(`${this._api}/${cdTipoEquipamento}`, tipoEquipamento)
   }

  buscarTipoEquipamentos(filter?: TipoEquipamentosFilter): Observable<ResponseData<ResponsePaginacao<TipoEquipamento>>> {
    return this._client.get(this._api, filter.getFilters()) as Observable<ResponseData<ResponsePaginacao<TipoEquipamento>>>
   }

  desativarTipoEquipamento(cdTipoEquipamento: number): Observable<void> {
    return this._client.patch(`${this._api}/${cdTipoEquipamento}`, null)
   }

}
