import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { EquipamentoRepository } from "@/application/repositories/equipamento.repository";
import { EquipamentosFilter } from "@/domain/filters/equipamento/equipamento.filter";
import { Equipamento } from "@/domain/models/command/equipamento";
import { EquipamentoQuery } from "@/domain/models/query/equipamento";
import { inject } from "@angular/core";
import { Client } from "@tivic-team/tivic-ui";
import { Observable } from "rxjs";

export class EquipamentoRepositoryImpl implements EquipamentoRepository {

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

}
