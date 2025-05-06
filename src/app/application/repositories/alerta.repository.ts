import { AlertaFilter } from "@/domain/filters/alerta/alerta.filter";
import { Alerta } from "@/domain/models/command/alerta";
import { AlertaQueryResponse } from "@/domain/models/query/alerta-query-response";
import { Observable } from "rxjs";
import { ResponseData } from "../dtos/response-data.dto";
import { ResponsePaginacao } from "../dtos/response-paginacao.dto";
import { Veiculo } from "@/domain/models/command/veiculo-deteccao";
import { VeiculoDeteccaoQueryResponse } from "@/domain/models/query/veiculo-deteccao-query-response";
import { AlertaCompletoQueryResponse } from "@/domain/models/query/alerta-completo-query-reponse";
export abstract class AlertaRepository {
  public abstract criarAlerta(payload: Alerta): Observable<void>;
  public abstract editarAlerta(cdAlerta: number, Alerta: Alerta): Observable<void>;
  public abstract buscarAlertas(filter: AlertaFilter): Observable<ResponseData<ResponsePaginacao<AlertaQueryResponse>>>
  public abstract buscarAlertaPorCd(cdAlerta: number):Observable<ResponseData<AlertaCompletoQueryResponse>>
  public abstract desativarAlerta(cdAlerta: number): Observable<void>;

  public abstract criarVeiculo(veiculo: Veiculo): Observable<any>;
  public abstract editarVeiculo(cdVeiculo: number, veiculo: Veiculo): Observable<void>;
  public abstract buscarVeiculoPorPlaca(nrPlaca?: string): Observable<ResponseData<VeiculoDeteccaoQueryResponse>>
}
