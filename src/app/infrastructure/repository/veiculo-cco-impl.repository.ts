import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { VeiculoCCORepository } from "@/application/repositories/veiculo-cco.repository";
import { VeiculoCCOFilter } from "@/domain/filters/veiculoCCO/veiculoCCO.filter";
import { VeiculoCCO } from "@/domain/models/command/veiculo-cco";
import { VeiculoCCOQueryResponse } from "@/domain/models/query/veiculo-cco-query-response";
import { inject } from "@angular/core";
import { Client } from "@tivic-team/tivic-ui";
import { Observable } from "rxjs";

export class VeiculoCCORepositoryIml implements VeiculoCCORepository {

  private _client = inject(Client);
  private readonly _api = "veiculos";

  criarVeiculoCCO(veiculo: VeiculoCCO): Observable<void> {
    return this._client.post(this._api, veiculo)
  }

  editarVeiculoCCO(cdVeiculo: number, veiculo: VeiculoCCO): Observable<void> {
    return this._client.put(`${this._api}/${cdVeiculo}`, veiculo)
  }

  buscarVeiculosCCO(filter?: VeiculoCCOFilter): Observable<ResponseData<ResponsePaginacao<VeiculoCCOQueryResponse>>> {
    return this._client.get(this._api, filter?.getFilters()) as Observable<ResponseData<ResponsePaginacao<VeiculoCCOQueryResponse>>>
  }

  desativarVeiculoCCO(cdVeiculo: number): Observable<void> {
    return this._client.patch(`${this._api}/${cdVeiculo}`, null)
  }

}