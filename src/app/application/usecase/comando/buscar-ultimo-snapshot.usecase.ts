import { ResponseData } from "@/application/dtos/response-data.dto";
import { ComandoRepository } from "@/application/repositories/comando.repository";
import { UltimoSnapshotQueryResponse } from "@/domain/models/query/ultimo-snapshot-query-response";
import { Observable } from "rxjs";

export class BuscarUltimoSnapshotUseCase {
  constructor(private comandoRepository: ComandoRepository){}

  public execute(idEquipamento: string): Observable<ResponseData<UltimoSnapshotQueryResponse>> {
    return this.comandoRepository.buscarUltimoSnapshot(idEquipamento);
  }
}
