import { TipoComponenteRepository } from "@/application/repositories/tipo-componente.repository";
import { TipoComponente } from "@/domain/models/command/tipo-componente";
import { Observable } from "rxjs";

export class CriarTipoComponenteUseCase {
  constructor(private tipoComponenteRepository: TipoComponenteRepository){}

  public execute(tipo: TipoComponente): Observable<void> {
    return this.tipoComponenteRepository.criarTipoComponente(tipo)
  }
}
