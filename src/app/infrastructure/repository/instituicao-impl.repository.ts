import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { InstituicaoRepository } from "@/application/repositories/instituicao.repository";
import { InstituicaoFilter } from "@/domain/filters/instituicao.filter";
import { Instituicao } from "@/domain/models/instituicao";
import { inject } from "@angular/core";
import { Client } from "@tivic-team/tivic-ui";
import { Observable } from "rxjs";

export class InstituicaoRepositoryImpl implements InstituicaoRepository {
  private _client = inject(Client);
  private readonly _api = "instituicoes";

  criarInstituicao( instituicao: Instituicao): Observable<ResponseData<Instituicao>> {
    return this._client.post(this._api, instituicao)
  }

  editarInstituicao(cdInstituicao: number, instituicao: Instituicao): Observable<void> {
    return this._client.put(`${this._api}/${cdInstituicao}`, instituicao)
  }

  buscarInstituicoes(filter?: InstituicaoFilter): Observable<ResponseData<ResponsePaginacao<Instituicao[]>>> {
    console.log(filter?.getFilters())
    return this._client.get(this._api, filter?.getFilters()) as Observable<ResponseData<ResponsePaginacao<Instituicao[]>>>
  }

}
