import { EquipamentoRepository } from "@/application/repositories/equipamento.repository";
import { Equipamento } from "@/domain/models/command/equipamento";
import { Observable } from "rxjs";

export class EditarEquipamentoUseCase {
  constructor(private equipamentoRepository: EquipamentoRepository) { }

  public execute(cdEquipamento: number, equipamento: Equipamento): Observable<void> {
    return this.equipamentoRepository.editarEquipamento(cdEquipamento, equipamento)
  }
}
