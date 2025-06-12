import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { MotivoRejeicaoRepository } from "@/application/repositories/motivo-rejeicao.repository";
import { MotivoRejeicaoFilter } from "@/domain/filters/motivo-rejeicao/motivo-rejeicao.filter";
import { MotivoRejeicaoQueryResponse } from "@/domain/models/query/motivo-rejeicao-query-response";
import { Observable } from "rxjs";

export class FindMotivoRejeicaoUseCase {
    constructor(private motivoRejeicaoRepository: MotivoRejeicaoRepository) {}

    execute(motivoRejeicaoFilter: MotivoRejeicaoFilter): Observable<ResponsePaginacao<ResponseData<MotivoRejeicaoQueryResponse[]>>> {
        return this.motivoRejeicaoRepository.findAllPaginado(motivoRejeicaoFilter);
    }
}