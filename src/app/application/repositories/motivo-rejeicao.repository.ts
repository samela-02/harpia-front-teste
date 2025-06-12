import { MotivoRejeicaoQueryResponse } from "@/domain/models/query/motivo-rejeicao-query-response";
import { ResponseData } from "../dtos/response-data.dto";
import { ResponsePaginacao } from "../dtos/response-paginacao.dto";
import { MotivoRejeicaoFilter } from "@/domain/filters/motivo-rejeicao/motivo-rejeicao.filter";
import { Observable } from "rxjs";

export abstract class MotivoRejeicaoRepository {
    abstract findAllPaginado(motivoRejeicaoFilter: MotivoRejeicaoFilter): Observable<ResponseData<ResponsePaginacao<MotivoRejeicaoQueryResponse>>>;
}