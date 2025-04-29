import { Observable } from "rxjs";
import { ResponseData } from "../dtos/response-data.dto";
import { ResponsePaginacao } from "../dtos/response-paginacao.dto";import { TipoComponente } from "@/domain/models/command/tipo-componente";
import { TiposComponentesFilter } from "@/domain/filters/tipo-componente/tipo-componente.filter";
;

export abstract class TipoComponenteRepository {
  public abstract criarTipoComponente(Tipo: TipoComponente): Observable<void>;
  public abstract editarTipoComponente(cdTipoComponente: number, TipoComponente: TipoComponente): Observable<void>;
  public abstract buscarTipoComponentes(filter: TiposComponentesFilter): Observable<ResponseData<ResponsePaginacao<TipoComponente>>>
  public abstract desativarTipoComponente(cdTipoComponente: number): Observable<void>;
}
