import { AlertaRepository } from "@/application/repositories/alerta.repository";
import { Alerta } from "@/domain/models/command/alerta";
import { Veiculo } from "@/domain/models/command/veiculo-deteccao";
import { VeiculoDeteccaoQueryResponse } from "@/domain/models/query/veiculo-deteccao-query-response";
import { Observable } from "rxjs";

export class EditarVeiculoUseCase {
  constructor(private alertaRepository: AlertaRepository){}

  public execute(cdVeiculo: number, veiculo: Veiculo): Observable<void> {
    return this.alertaRepository.editarVeiculo(cdVeiculo,veiculo)
  }
}
