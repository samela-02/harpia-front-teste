import { Observable } from "rxjs";
import { PastaAlertaRepository } from "@/application/repositories/pasta-alerta.repository";
import { PastaAlerta } from "@/domain/models/command/pasta-alerta";

export class CriarPastaAlertaUseCase {
  constructor(private pastaAlertaRepository: PastaAlertaRepository){}

  public execute(pastaAlerta: PastaAlerta): Observable<void> {
    return this.pastaAlertaRepository.criarPastaAlerta(pastaAlerta)
  }
}
