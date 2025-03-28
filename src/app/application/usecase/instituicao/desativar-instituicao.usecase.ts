import { Instituicao } from "@/domain/models/instituicao";
import { InstituicaoRepository } from "../../repositories/instituicao.repository";
import { Observable } from "rxjs";

export class DesativarInstituicaoUseCase {
  constructor(private instituicaoRepository: InstituicaoRepository){}

  public execute(cdInstituicao: number): Observable<void> {
    return this.instituicaoRepository.desativarInstituicao(cdInstituicao)
  }
}
