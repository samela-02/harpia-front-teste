import { VeiculoCCORepository } from "@/application/repositories/veiculo-cco.repository";
import { Observable } from "rxjs";

export class DesativarVeiculoCCOUseCase {
  constructor(private tipoEquipamentoRepository: VeiculoCCORepository){}

  public execute(cdVeiculoCCO: number): Observable<void> {
    return this.tipoEquipamentoRepository.desativarVeiculoCCO(cdVeiculoCCO)
  }
}
