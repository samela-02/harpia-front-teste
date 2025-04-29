import { CidadeQueryResponse } from "@/domain/models/query/cidade-query-response";
import { Observable } from "rxjs";
import { ResponseData } from "../dtos/response-data.dto";
import { ResponsePaginacao } from "../dtos/response-paginacao.dto";
import { CidadeFilter } from "@/domain/filters/cidade/cidade.filter";

export abstract class CidadeRepository {
    abstract findByQO(cidadeFilter: CidadeFilter): Observable<ResponsePaginacao<CidadeQueryResponse>>;
}