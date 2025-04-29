import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { VeiculoCCORepository } from "@/application/repositories/veiculo-cco.repository";
import { VeiculoCCOFilter } from "@/domain/filters/veiculoCCO/veiculoCCO.filter";
import { VeiculoCCOQueryResponse } from "@/domain/models/query/veiculo-cco-query-response";
import { Observable } from "rxjs";
import { ResponseData } from "../../dtos/response-data.dto";

export class BuscarVeiculosCCOUseCase {
  constructor(private veiculosCCORepository: VeiculoCCORepository){}

  public execute(filter?: VeiculoCCOFilter): Observable<ResponseData<ResponsePaginacao<VeiculoCCOQueryResponse>>> {
    return this.veiculosCCORepository.buscarVeiculosCCO(filter)
  }
}
