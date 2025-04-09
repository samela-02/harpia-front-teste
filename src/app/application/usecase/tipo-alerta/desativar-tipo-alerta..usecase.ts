import { TipoAlertaRepository } from "@/application/repositories/tipo-alerta.repository";
import { Observable } from "rxjs";

export class DesativarTipoAlertaUseCase {
  constructor(private tipoAlertaRepository: TipoAlertaRepository){}

  public execute(cdTipoAlerta: number): Observable<void> {
    return this.tipoAlertaRepository.desativarTipoAlerta(cdTipoAlerta)
  }
}
