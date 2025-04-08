import { Observable } from "rxjs";
import { ResponseData } from "../dtos/response-data.dto";
import { ResponsePaginacao } from "../dtos/response-paginacao.dto";
import { ListaAlerta } from "@/domain/models/command/lista-alerta";
import { ListaAlertaResponse } from "@/domain/models/query/lista-alerta-response";
import { ListaAlertaFilter } from "@/domain/filters/lista-alerta/lista-alerta.filter";

export abstract class ListaAlertaRepository {
  public abstract criarListaAlerta(Lista: ListaAlerta): Observable<void>;
  public abstract editarListaAlerta(cdListaAlerta: number, ListaAlerta: ListaAlerta): Observable<void>;
  public abstract buscarListaAlertas(filter: ListaAlertaFilter): Observable<ResponseData<ResponsePaginacao<ListaAlertaResponse>>>
  public abstract desativarListaAlerta(cdListaAlerta: number): Observable<void>;
}