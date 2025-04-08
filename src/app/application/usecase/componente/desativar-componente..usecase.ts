import { ComponenteRepository } from "@/application/repositories/componente.repository";
import { Observable } from "rxjs";

export class DesativarComponenteUseCase {
  constructor(private componenteRepository: ComponenteRepository){}

  public execute(cdComponente: number): Observable<void> {
    return this.componenteRepository.desativarComponente(cdComponente)
  }
}
