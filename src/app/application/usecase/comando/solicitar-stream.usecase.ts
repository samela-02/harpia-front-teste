import { EosResponseDto } from "@/application/dtos/eos/eos-response.dto";
import { ResponseData } from "@/application/dtos/response-data.dto";
import { ComandoRepository } from "@/application/repositories/comando.repository";
import { ComandoDTo } from "@/domain/dtos/comando.dto";
import { Observable } from "rxjs";

export class SolicitarStreamUseCase {
  constructor(private comandoRepository: ComandoRepository) {}

  public execute(comando: ComandoDTo): Observable<ResponseData<EosResponseDto>> {
    return this.comandoRepository.solicitarStream(comando);
  }
}
