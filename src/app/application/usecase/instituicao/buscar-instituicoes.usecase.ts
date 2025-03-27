import { Instituicao } from "@/domain/models/instituicao";
import { InstituicaoRepository } from "../../repositories/instituicao.repository";
import { Observable } from "rxjs";
import { ResponseData } from "../../dtos/response-data.dto";
import { InstituicaoFilter } from "@/domain/filters/instituicao.filter";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";

export class BuscarInstituicoesUseCase {
  constructor(private instituicaoRepository: InstituicaoRepository){}

  public execute(filter?: InstituicaoFilter): Observable<ResponseData<ResponsePaginacao<Instituicao[]>>> {
    return this.instituicaoRepository.buscarInstituicoes(filter)
  }
}
