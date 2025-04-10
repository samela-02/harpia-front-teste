import { AlertaFilter } from "@/domain/filters/alerta/alerta.filter";
import { Alerta } from "@/domain/models/command/alerta";
import { AlertaQueryResponse } from "@/domain/models/query/alerta-query-response";
import { Observable } from "rxjs";
import { ResponseData } from "../dtos/response-data.dto";
import { ResponsePaginacao } from "../dtos/response-paginacao.dto";
;

export abstract class AlertaRepository {
  public abstract criarAlerta(payload: Alerta): Observable<void>;
  public abstract editarAlerta(cdAlerta: number, Alerta: Alerta): Observable<void>;
  public abstract buscarAlertas(filter: AlertaFilter): Observable<ResponseData<ResponsePaginacao<AlertaQueryResponse>>>
  public abstract desativarAlerta(cdAlerta: number): Observable<void>;
}
