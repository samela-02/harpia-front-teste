import { ComandoDTo } from "@/domain/dtos/comando.dto";
import { EventSourceMessage } from "@microsoft/fetch-event-source";
import { Observable } from "rxjs";
import { ResponseData } from "../dtos/response-data.dto";
import { UltimoSnapshotQueryResponse } from "@/domain/models/query/ultimo-snapshot-query-response";

export abstract class ComandoRepository {
  public abstract buscarComando(idComando: string): Observable<EventSourceMessage>;
  public abstract solicitarSnapshot(comando: ComandoDTo): Observable<void>;
  public abstract solicitarWebRtc(comando: ComandoDTo): Observable<void>;
  public abstract buscarUltimoSnapshot(idEquipamento: String): Observable<ResponseData<UltimoSnapshotQueryResponse>>;
}
