import { AlertaRepository } from "@/application/repositories/alerta.repository";
import { Observable } from "rxjs";

export class DesativarAlertaUseCase {
  constructor(private alertaRepository: AlertaRepository){}

  public execute(cdAlerta: number): Observable<void> {
    return this.alertaRepository.desativarAlerta(cdAlerta)
  }
}
