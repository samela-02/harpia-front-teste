import { EquipamentoRepository } from "@/application/repositories/equipamento.repository";
import { Observable } from "rxjs";

export class DesativarEquipamentoUseCase {
  constructor(private equipamentoRepository: EquipamentoRepository){}

  public execute(cdEquipamento: number): Observable<void> {
    return this.equipamentoRepository.desativarEquipamento(cdEquipamento)
  }
}
