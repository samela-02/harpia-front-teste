import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { DeteccaoRepository } from "@/application/repositories/deteccao.repository";
import { DeteccaoFilter } from "@/domain/filters/deteccao/deteccao.filter";
import { DeteccaoRejeitada } from "@/domain/models/command/deteccao/deteccao-rejeitada";
import { DeteccaoQueryResponse } from "@/domain/models/query/deteccao-query-response";
import { inject } from "@angular/core";
import { Client } from "@tivic-team/tivic-ui";
import { Observable } from "rxjs";

export class DeteccaoImplRepository implements DeteccaoRepository{
  private _client = inject(Client);
  private readonly _api = "deteccoes";

  buscarDeteccoes(filter?: DeteccaoFilter): Observable<ResponseData<ResponsePaginacao<DeteccaoQueryResponse>>> {
    return this._client.get(this._api, filter.getFilters()) as Observable<ResponseData<ResponsePaginacao<DeteccaoQueryResponse>>>
  }

  rejeitarDeteccao(deteccaoRejeitada: DeteccaoRejeitada): Observable<void> {
    return this._client.post(`${this._api}/rejeicao`, deteccaoRejeitada);
  }
}