import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { InstituicaoRepository } from "@/application/repositories/instituicao.repository";
import { PastaAlertaRepository } from "@/application/repositories/pasta-alerta.repository";
import { InstituicaoFilter } from "@/domain/filters/instituicao/instituicao.filter";
import { Instituicao } from "@/domain/models/command/instituicao";
import { PastaAlerta } from "@/domain/models/command/pasta-alerta";
import { PastaAlertaResponse } from "@/domain/models/query/pasta-alerta-response";
import { inject } from "@angular/core";
import { Client } from "@tivic-team/tivic-ui";
import { Observable } from "rxjs";

export class PastaAlertaRepositoryImpl implements PastaAlertaRepository {

  private _client = inject(Client);
  private readonly _api = "pasta-alerta";

  criarPastaAlerta(pasta: PastaAlerta): Observable<void> {
    return this._client.post(this._api, pasta)
   }
  editarPastaAlerta(cdPastaAlerta: number, pastaAlerta: PastaAlerta): Observable<void> {
    return this._client.put(`${this._api}/${cdPastaAlerta}`, pastaAlerta)
   }
  buscarPastaAlertas(): Observable<ResponseData<ResponsePaginacao<PastaAlertaResponse>>> {
    return this._client.get(this._api) as Observable<ResponseData<ResponsePaginacao<PastaAlertaResponse>>>
   }
  desativarPastaAlerta(cdListaAlerta: number): Observable<void> {
    return this._client.patch(`${this._api}/${cdListaAlerta}`, null)
   }

}
