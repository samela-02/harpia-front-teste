import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { ComponenteRepository } from "@/application/repositories/componente.repository";
import { ComponentesFilter } from "@/domain/filters/componente/componente.filter";
import { Componente } from "@/domain/models/command/componentes";
import { Observable } from "rxjs";

export class BuscarComponentesUseCase {
  constructor(private componentesRepository: ComponenteRepository) { }

  public execute(filter?: ComponentesFilter): Observable<ResponseData<ResponsePaginacao<Componente>>> {
    return this.componentesRepository.buscarComponentes(filter)
  }
}
