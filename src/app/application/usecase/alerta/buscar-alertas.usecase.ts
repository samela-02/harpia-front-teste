import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { AlertaRepository } from "@/application/repositories/alerta.repository";
import { AlertaFilter } from "@/domain/filters/alerta/alerta.filter";
import { AlertaQueryResponse } from "@/domain/models/query/alerta-query-response";
import { Observable } from "rxjs";
import { ResponseData } from "../../dtos/response-data.dto";

export class BuscarAlertasUseCase {
  constructor(private alertasRepository: AlertaRepository){}

  public execute(filter?: AlertaFilter): Observable<ResponseData<ResponsePaginacao<AlertaQueryResponse>>> {
    return this.alertasRepository.buscarAlertas(filter)
  }
}
