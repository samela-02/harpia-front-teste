import { PastaAlertaRepository } from "@/application/repositories/pasta-alerta.repository";
import { Observable } from "rxjs";

export class DesativarPastaAlertaUseCase {
  constructor(private pastaAlertaRepository: PastaAlertaRepository){}

  public execute(cdPastaAlerta: number): Observable<void> {
    return this.pastaAlertaRepository.desativarPastaAlerta(cdPastaAlerta)
  }
}
