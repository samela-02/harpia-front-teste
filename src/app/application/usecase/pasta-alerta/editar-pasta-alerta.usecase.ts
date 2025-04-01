import { Observable } from "rxjs";
import { PastaAlertaRepository } from "@/application/repositories/pasta-alerta.repository";
import { PastaAlerta } from "@/domain/models/command/pasta-alerta";

export class EditarPastaAlertaUseCase {
  constructor(private pastaAlertaRepository: PastaAlertaRepository){}

  public execute(cdPastaAlerta: number, pastaAlerta: PastaAlerta): Observable<void> {
    return this.pastaAlertaRepository.editarPastaAlerta(cdPastaAlerta, pastaAlerta)
  }
}
