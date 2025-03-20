import { ResponseData } from "@/application/dtos/response-data.dto";
import { InstituicaoRepository } from "@/application/repositories/instituicao.repository";
import { Instituicao } from "@/domain/model/instituicao";
import { inject } from "@angular/core";
import { Client } from "@tivic-team/tivic-ui";
import { Observable } from "rxjs";

export class InstituicaoRepositoryImpl implements InstituicaoRepository {
  private _client = inject(Client);
  private readonly _api = "instituicoes";

  criarInstituicao(instituicao: Instituicao): Observable<ResponseData<Instituicao>> {
    return this._client.post(this._api, instituicao)
  }

}
