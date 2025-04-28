import { VeiculoCCORepository } from "@/application/repositories/veiculo-cco.repository";
import { VeiculoCCO } from "@/domain/models/command/veiculo-cco";
import { Observable } from "rxjs";

export class CriarVeiculoCCOUseCase {
  constructor(private veiculoCCORepository: VeiculoCCORepository){}

  public execute(veiculo: VeiculoCCO): Observable<void> {
    return this.veiculoCCORepository.criarVeiculoCCO(veiculo)
  }
}
