import { TipoAlertaRepository } from "@/application/repositories/tipo-alerta.repository";
import { TipoAlerta } from "@/domain/models/command/tipo-alerta";
import { Observable } from "rxjs";

export class EditarTipoAlertaUseCase {
  constructor(private tipoAlertaRepository: TipoAlertaRepository){}

  public execute(cdTipoAlerta: number, tipoAlerta: TipoAlerta): Observable<void> {
    return this.tipoAlertaRepository.editarTipoAlerta(cdTipoAlerta,tipoAlerta)
  }
}
