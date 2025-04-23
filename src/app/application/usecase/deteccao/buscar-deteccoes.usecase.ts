import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { DeteccaoRepository } from "@/application/repositories/deteccao.repository";
import { DeteccaoFilter } from "@/domain/filters/deteccao/deteccao.filter";
import { DeteccaoQueryResponse } from "@/domain/models/query/deteccao-query-response";
import { Observable } from "rxjs";

export class BuscarDeteccoesUseCase {
  constructor(private deteccaoRepository: DeteccaoRepository){}

  public execute(filter?: DeteccaoFilter): Observable<ResponseData<ResponsePaginacao<DeteccaoQueryResponse>>> {
    console.log(filter)
    return this.deteccaoRepository.buscarDeteccoes(filter)
  }
}