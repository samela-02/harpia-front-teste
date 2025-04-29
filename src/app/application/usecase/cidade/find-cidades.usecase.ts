import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { CidadeRepository } from "@/application/repositories/cidade.repository";
import { CidadeFilter } from "@/domain/filters/cidade/cidade.filter";
import { CidadeQueryResponse } from "@/domain/models/query/cidade-query-response";
import { Observable } from "rxjs";

export class FindCidadesUseCase {
    constructor(private _cidadeRepository: CidadeRepository) {}

    public execute(filter?: CidadeFilter): Observable<ResponsePaginacao<CidadeQueryResponse>> {
        return this._cidadeRepository.findByQO(filter);
    }
}