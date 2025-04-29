import { ComponenteRepository } from "@/application/repositories/componente.repository";
import { Componente } from "@/domain/models/command/componentes";
import { Observable } from "rxjs";

export class EditarComponenteUseCase {
  constructor(private componenteRepository: ComponenteRepository) { }

  public execute(cdComponente: number, componente: Componente): Observable<void> {
    return this.componenteRepository.editarComponente(cdComponente, componente)
  }
}
