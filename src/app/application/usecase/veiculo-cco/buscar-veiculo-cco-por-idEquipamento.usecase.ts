import { ResponseData } from "@/application/dtos/response-data.dto";
import { VeiculoCCORepository } from "@/application/repositories/veiculo-cco.repository";
import { VeiculoCCOQueryResponse } from "@/domain/models/query/veiculo-cco-query-response";
import { Observable } from "rxjs";

export class BuscarVeiculoCCOIdEquipamentoUseCase {
  constructor(private veiculosCCORepository: VeiculoCCORepository){}

  public execute(idInstituicao: string): Observable<ResponseData<VeiculoCCOQueryResponse>> {
    return this.veiculosCCORepository.buscarVeiculoCCOPorIdEquipamento(idInstituicao);
  }
}
