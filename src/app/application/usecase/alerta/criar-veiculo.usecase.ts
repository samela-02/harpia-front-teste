import { AlertaRepository } from "@/application/repositories/alerta.repository";
import { Veiculo } from "@/domain/models/command/veiculo-deteccao";
import { Observable } from "rxjs";

export class CriarVeiculoUseCase {
  constructor(private alertaRepository: AlertaRepository){}

  public execute(veiculo: Veiculo): Observable<any> {
    return this.alertaRepository.criarVeiculo(veiculo)
  }
}
