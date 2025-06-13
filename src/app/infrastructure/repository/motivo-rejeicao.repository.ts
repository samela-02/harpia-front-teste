import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { MotivoRejeicaoRepository } from "@/application/repositories/motivo-rejeicao.repository";
import { MotivoRejeicaoFilter } from "@/domain/filters/motivo-rejeicao/motivo-rejeicao.filter";
import { MotivoRejeicaoQueryResponse } from "@/domain/models/query/motivo-rejeicao-query-response";
import { Client } from "@tivic-team/tivic-ui";
import { Observable } from "rxjs";

export class MotivoRejeicaoRepositoryImpl extends MotivoRejeicaoRepository {
    private readonly url = "motivo-rejeicao";

    constructor(private _client: Client) {
        super();
    }
    
    findAllPaginado(motivoRejeicaoFilter: MotivoRejeicaoFilter): Observable<ResponseData<ResponsePaginacao<MotivoRejeicaoQueryResponse>>> {
        return this._client.get(this.url, motivoRejeicaoFilter.getFilters()) as Observable<ResponseData<ResponsePaginacao<MotivoRejeicaoQueryResponse>>>;
    }
}