import { TipoEquipamentoRepository } from "@/application/repositories/tipo-equipamento.repository";
import { TipoEquipamento } from "@/domain/models/tipo-equipamento";
import { Observable } from "rxjs";

export class EditarTipoEquipamentoUseCase {
  constructor(private tipoEquipamentoRepository: TipoEquipamentoRepository){}

  public execute(cdTipoEquipamento: number, tipoEquipamento: TipoEquipamento): Observable<void> {
    return this.tipoEquipamentoRepository.editarTipoEquipamento(cdTipoEquipamento,tipoEquipamento)

  }
}
