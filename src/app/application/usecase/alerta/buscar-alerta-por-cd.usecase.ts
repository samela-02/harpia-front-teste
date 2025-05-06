import { ResponseData } from "@/application/dtos/response-data.dto";
import { AlertaRepository } from "@/application/repositories/alerta.repository";
import { AlertaCompletoQueryResponse } from "@/domain/models/query/alerta-completo-query-reponse";
import { Observable } from "rxjs";

export class BuscarAlertaPorCdUseCase {
  constructor(private alertaRepository: AlertaRepository){}

  execute(cdAlerta: number): Observable<ResponseData<AlertaCompletoQueryResponse>> {
    return this.alertaRepository.buscarAlertaPorCd(cdAlerta)
  }
}