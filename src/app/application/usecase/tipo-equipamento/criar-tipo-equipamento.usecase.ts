import { TipoEquipamentoRepository } from "@/application/repositories/tipo-equipamento.repository";
import { TipoEquipamento } from "@/domain/models/tipo-equipamento";
import { Observable } from "rxjs";

export class CriarTipoEquipamentoUseCase {
  constructor(private instituicaoRepository: TipoEquipamentoRepository){}

  public execute(tipo: TipoEquipamento): Observable<void> {
    return this.instituicaoRepository.criarTipoEquipamento(tipo)
  }
}
