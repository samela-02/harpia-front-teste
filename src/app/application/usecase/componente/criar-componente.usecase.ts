import { ComponenteRepository } from "@/application/repositories/componente.repository";
import { Componente } from "@/domain/models/command/componentes";
import { Observable } from "rxjs";

export class CriarComponenteUseCase {
  constructor(private equipamentoRepository: ComponenteRepository){}

  public execute(equipamento: Componente): Observable<void> {
    return this.equipamentoRepository.criarComponente(equipamento)
  }
}
