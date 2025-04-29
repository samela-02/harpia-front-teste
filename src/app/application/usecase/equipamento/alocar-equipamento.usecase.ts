import { EquipamentoRepository } from "@/application/repositories/equipamento.repository";
import { Observable } from "rxjs";

export class AlocarEquipamentoUseCase{
  constructor(private equipamentoRepository: EquipamentoRepository) { }

  public execute(cdEquipamento: number, cdVeiculo: number): Observable<void> {
    return this.equipamentoRepository.alocarEquipamento(cdEquipamento, cdVeiculo)
  }
}