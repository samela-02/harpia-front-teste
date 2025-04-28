import { VeiculoCCORepository } from "@/application/repositories/veiculo-cco.repository";
import { VeiculoCCO } from "@/domain/models/command/veiculo-cco";
import { Observable } from "rxjs";

export class EditarVeiculoCCOUseCase {
  constructor(private veiculoCCORepository: VeiculoCCORepository){}

  public execute(cdVeiculo: number, veiculoCCO: VeiculoCCO): Observable<void> {
    return this.veiculoCCORepository.editarVeiculoCCO(cdVeiculo,veiculoCCO)
  }
}
