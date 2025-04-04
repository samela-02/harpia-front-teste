import { EquipamentoRepository } from "@/application/repositories/equipamento.repository";
import { Equipamento } from "@/domain/models/command/equipamento";
import { Observable } from "rxjs";

export class CriarEquipamentoUseCase {
  constructor(private equipamentoRepository: EquipamentoRepository){}

  public execute(equipamento: Equipamento): Observable<void> {
    return this.equipamentoRepository.criarEquipamento(equipamento)
  }
}
