import { ComandoDTo } from "@/domain/dtos/comando.dto";
import { EventSourceMessage } from "@microsoft/fetch-event-source";
import { Observable } from "rxjs";

export abstract class ComandoRepository {
  public abstract buscarComando(idComando: string): Observable<EventSourceMessage>;
  public abstract enviarComando(comando: ComandoDTo): Observable<void>;
}