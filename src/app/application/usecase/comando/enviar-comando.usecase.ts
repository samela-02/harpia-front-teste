import { ComandoRepository } from "@/application/repositories/comando.repository";
import { ComandoDTo } from "@/domain/dtos/comando.dto";
import { Observable } from "rxjs";

export class EnviarComandoUseCase {
  constructor(private comandoRepository: ComandoRepository) { }

  public execute(comando: ComandoDTo): Observable<void> {
    return this.comandoRepository.enviarComando(comando);
  }
}