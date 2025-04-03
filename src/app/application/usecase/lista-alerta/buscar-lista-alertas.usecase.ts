import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { ListaAlertaRepository } from "@/application/repositories/lista-alerta.repository";
import { ListaAlertaResponse } from "@/domain/models/query/lista-alerta-response";
import { Observable } from "rxjs";
import { ResponseData } from "../../dtos/response-data.dto";

export class BuscarListaAlertaUseCase {
  constructor(private listaAlertaRepository: ListaAlertaRepository){}

  public execute(): Observable<ResponseData<ResponsePaginacao<ListaAlertaResponse>>> {
    return this.listaAlertaRepository.buscarListaAlertas()
  }
}
