import { Observable } from "rxjs";
import { ResponseData } from "../dtos/response-data.dto";
import { ResponsePaginacao } from "../dtos/response-paginacao.dto";
import { Componente } from "@/domain/models/command/componentes";
import { ComponentesFilter } from "@/domain/filters/componente/componente.filter";

export abstract class ComponenteRepository {
  public abstract criarComponente(compoenente: Componente): Observable<void>;
  public abstract editarComponente(cdComponente: number, compoenente: Componente): Observable<void>;
  public abstract buscarComponentes(filter: ComponentesFilter): Observable<ResponseData<ResponsePaginacao<Componente>>>
  public abstract desativarComponente(cdComponente: number): Observable<void>;
}
