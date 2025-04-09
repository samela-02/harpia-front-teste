import { TipoAlertaRepository } from "@/application/repositories/tipo-alerta.repository";
import { TipoAlerta } from "@/domain/models/command/tipo-alerta";
import { Observable } from "rxjs";

export class CriarTipoAlertaUseCase {
  constructor(private instituicaoRepository: TipoAlertaRepository){}

  public execute(tipo: TipoAlerta): Observable<void> {
    return this.instituicaoRepository.criarTipoAlerta(tipo)
  }
}
