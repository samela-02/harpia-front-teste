import { TipoEquipamentoRepository } from "@/application/repositories/tipo-equipamento.repository";
import { Observable } from "rxjs";

export class DesativarTipoEquipamentoUseCase {
  constructor(private tipoEquipamentoRepository: TipoEquipamentoRepository){}

  public execute(cdTipoEquipamento: number): Observable<void> {
    return this.tipoEquipamentoRepository.desativarTipoEquipamento(cdTipoEquipamento)
  }
}
