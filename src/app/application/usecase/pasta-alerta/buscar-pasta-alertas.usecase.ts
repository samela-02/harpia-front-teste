import { Observable } from "rxjs";
import { ResponseData } from "../../dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { PastaAlertaRepository } from "@/application/repositories/pasta-alerta.repository";
import { PastaAlertaResponse } from "@/domain/models/query/pasta-alerta-response";

export class BuscarPastaAlertaUseCase {
  constructor(private pastaAlertaRepository: PastaAlertaRepository){}

  public execute(): Observable<ResponseData<ResponsePaginacao<PastaAlertaResponse>>> {
    return this.pastaAlertaRepository.buscarPastaAlertas()
  }
}
