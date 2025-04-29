import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { TipoComponenteRepository } from "@/application/repositories/tipo-componente.repository";
import { TiposComponentesFilter } from "@/domain/filters/tipo-componente/tipo-componente.filter";
import { TipoComponente } from "@/domain/models/command/tipo-componente";
import { Observable } from "rxjs";
import { ResponseData } from "../../dtos/response-data.dto";

export class BuscarTiposComponentesUseCase {
  constructor(private tiposComponentesRepository: TipoComponenteRepository){}

  public execute(filter?: TiposComponentesFilter): Observable<ResponseData<ResponsePaginacao<TipoComponente>>> {
    return this.tiposComponentesRepository.buscarTipoComponentes(filter)
  }
}
