import { TipoComponenteRepository } from "@/application/repositories/tipo-componente.repository";
import { TipoComponente } from "@/domain/models/command/tipo-componente";
import { Observable } from "rxjs";

export class EditarTipoComponenteUseCase {
  constructor(private tipoComponenteRepository: TipoComponenteRepository){}

  public execute(cdTipoComponente: number, tipoComponente: TipoComponente): Observable<void> {
    return this.tipoComponenteRepository.editarTipoComponente(cdTipoComponente,tipoComponente)

  }
}
