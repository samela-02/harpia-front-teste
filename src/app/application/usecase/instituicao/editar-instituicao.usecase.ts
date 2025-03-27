import { Instituicao } from "@/domain/models/instituicao";
import { InstituicaoRepository } from "../../repositories/instituicao.repository";
import { Observable } from "rxjs";

export class EditarInstituicaoUseCase {
  constructor(private instituicaoRepository: InstituicaoRepository){}

  public execute(cdInstituicao: number, instituicao: Instituicao): Observable<void> {
    return this.instituicaoRepository.editarInstituicao(cdInstituicao,instituicao)
  }
}
