import { Observable } from "rxjs";
import { ResponseData } from "../dtos/response-data.dto";
import { ResponsePaginacao } from "../dtos/response-paginacao.dto";import { TipoComponente } from "@/domain/models/command/tipo-componente";
import { TiposComponentesFilter } from "@/domain/filters/tipo-componente/tipo-componente.filter";
import { TipoAlerta } from "@/domain/models/command/tipo-alerta";
import { TipoAlertaQueryResponse } from "@/domain/models/query/tipo-alerta-query-response";
import { TipoAlertaFilter } from "@/domain/filters/tipo-alerta/tipo-alerta.filter";
;

export abstract class TipoAlertaRepository {
  public abstract criarTipoAlerta(Tipo: TipoAlerta): Observable<void>;
  public abstract editarTipoAlerta(cdTipoAlerta: number, TipoAlerta: TipoAlerta): Observable<void>;
  public abstract buscarTiposAlertas(filter: TipoAlertaFilter): Observable<ResponseData<ResponsePaginacao<TipoAlertaQueryResponse>>>
  public abstract buscarTipoAlertaPeloCd(cdAlerta: number): Observable<ResponseData<TipoAlertaQueryResponse>>
  public abstract desativarTipoAlerta(cdTipoAlerta: number): Observable<void>;
}
