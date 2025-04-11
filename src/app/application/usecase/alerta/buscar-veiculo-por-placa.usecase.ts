import { AlertaRepository } from "@/application/repositories/alerta.repository";
import { VeiculoDeteccaoQueryResponse } from "@/domain/models/query/veiculo-deteccao-query-response";
import { Observable } from "rxjs";
import { ResponseData } from "../../dtos/response-data.dto";

export class BuscarVeiculoPorPlacaUseCase {
  constructor(private alertasRepository: AlertaRepository){}

  public execute(nrPlaca: string): Observable<ResponseData<VeiculoDeteccaoQueryResponse>> {
    return this.alertasRepository.buscarVeiculoPorPlaca(nrPlaca)
  }
}
