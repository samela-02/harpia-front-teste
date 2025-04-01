import { PastaAlerta } from "@/domain/models/command/pasta-alerta";
import { Observable } from "rxjs";
import { ResponseData } from "../dtos/response-data.dto";
import { PastaAlertaResponse } from "@/domain/models/query/pasta-alerta-response";
import { ResponsePaginacao } from "../dtos/response-paginacao.dto";

export abstract class PastaAlertaRepository {
  public abstract criarPastaAlerta(Pasta: PastaAlerta): Observable<void>;
  public abstract editarPastaAlerta(cdPastaAlerta: number, PastaAlerta: PastaAlerta): Observable<void>;
  public abstract buscarPastaAlertas(): Observable<ResponseData<ResponsePaginacao<PastaAlertaResponse>>>
  public abstract desativarPastaAlerta(cdListaAlerta: number): Observable<void>;
}