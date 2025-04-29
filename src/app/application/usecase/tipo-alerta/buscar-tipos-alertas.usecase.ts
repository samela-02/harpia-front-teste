import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { TipoAlertaRepository } from "@/application/repositories/tipo-alerta.repository";
import { TipoAlertaFilter } from "@/domain/filters/tipo-alerta/tipo-alerta.filter";
import { TipoAlertaQueryResponse } from "@/domain/models/query/tipo-alerta-query-response";
import { Observable } from "rxjs";
import { ResponseData } from "../../dtos/response-data.dto";

export class BuscarTiposAlertasUseCase {
  constructor(private tiposAlertasRepository: TipoAlertaRepository){}

  public execute(filter?: TipoAlertaFilter): Observable<ResponseData<ResponsePaginacao<TipoAlertaQueryResponse>>> {
    return this.tiposAlertasRepository.buscarTiposAlertas(filter)
  }
}
