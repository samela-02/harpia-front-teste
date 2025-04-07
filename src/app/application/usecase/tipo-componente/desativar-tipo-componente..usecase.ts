import { TipoComponenteRepository } from "@/application/repositories/tipo-componente.repository";
import { Observable } from "rxjs";

export class DesativarTipoComponenteUseCase {
  constructor(private tipoComponenteRepository: TipoComponenteRepository){}

  public execute(cdTipoComponente: number): Observable<void> {
    return this.tipoComponenteRepository.desativarTipoComponente(cdTipoComponente)
  }
}
