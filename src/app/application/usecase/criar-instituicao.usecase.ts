import { Instituicao } from "@/domain/model/instituicao";
import { InstituicaoRepository } from "../repositories/instituicao.repository";
import { Observable } from "rxjs";
import { ResponseData } from "../dtos/response-data.dto";

export class CriarInstituicaoUseCase {
  constructor(private instituicaoRepository: InstituicaoRepository){}

  public execute(instituicao: Instituicao): Observable<ResponseData<Instituicao>> {
    return this.instituicaoRepository.criarInstituicao(instituicao)
  }
}
