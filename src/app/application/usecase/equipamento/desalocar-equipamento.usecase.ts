import { EquipamentoRepository } from "@/application/repositories/equipamento.repository";
import { Observable } from "rxjs";

export class DesalocarEquipamentoUseCase{
  constructor(private equipamentoRepository: EquipamentoRepository) { }

  public execute(cdEquipamento: number): Observable<void> {
    return this.equipamentoRepository.desalocarEquipamento(cdEquipamento)
  }
}