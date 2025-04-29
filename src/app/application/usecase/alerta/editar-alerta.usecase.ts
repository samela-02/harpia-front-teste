import { AlertaRepository } from "@/application/repositories/alerta.repository";
import { Alerta } from "@/domain/models/command/alerta";
import { Observable } from "rxjs";

export class EditarAlertaUseCase {
  constructor(private alertaRepository: AlertaRepository){}

  public execute(cdAlerta: number, alerta: Alerta): Observable<void> {
    return this.alertaRepository.editarAlerta(cdAlerta,alerta)
  }
}
