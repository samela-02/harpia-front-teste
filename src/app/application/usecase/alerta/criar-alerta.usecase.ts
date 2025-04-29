import { AlertaRepository } from "@/application/repositories/alerta.repository";
import { Alerta } from "@/domain/models/command/alerta";
import { Observable } from "rxjs";

export class CriarAlertaUseCase {
  constructor(private alertaRepository: AlertaRepository){}

  public execute(alerta: Alerta): Observable<void> {
    return this.alertaRepository.criarAlerta(alerta)
  }
}
