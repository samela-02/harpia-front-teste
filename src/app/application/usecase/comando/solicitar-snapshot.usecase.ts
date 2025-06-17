import { ComandoRepository } from "@/application/repositories/comando.repository";
import { ComandoDTo } from "@/domain/dtos/comando.dto";
import { Observable } from "rxjs";

export class SolicitarSnapshotUseCase {
  constructor(private comandoRepository: ComandoRepository) { }

  public execute(comando: ComandoDTo): Observable<void> {
    return this.comandoRepository.solicitarSnapshot(comando);
  }
}
