import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { CidadeRepository } from "@/application/repositories/cidade.repository";
import { CidadeFilter } from "@/domain/filters/cidade/cidade.filter";
import { CidadeQueryResponse } from "@/domain/models/query/cidade-query-response";
import { Client } from "@tivic-team/tivic-ui";
import { Observable } from "rxjs";

export class CidadeRepositoryImpl extends CidadeRepository {
    private readonly url = "cidades";

    constructor(private _client: Client) {
        super();
    }

    public findByQO(CidadecidadeFilter: CidadeFilter): Observable<ResponsePaginacao<CidadeQueryResponse>> {
        return this._client.get(this.url) as Observable<ResponsePaginacao<CidadeQueryResponse>>;
    }
}