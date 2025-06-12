import { DeteccaoQueryResponse } from "@/domain/models/query/deteccao-query-response";
import { Observable } from "rxjs";
import { ResponseData } from "../dtos/response-data.dto";
import { ResponsePaginacao } from "../dtos/response-paginacao.dto";
import { DeteccaoFilter } from "@/domain/filters/deteccao/deteccao.filter";
import { DeteccaoRejeitada } from "@/domain/models/command/deteccao/movimentacao-deteccao";

export abstract class DeteccaoRepository {
  public abstract buscarDeteccoes(filter?: DeteccaoFilter): Observable<ResponseData<ResponsePaginacao<DeteccaoQueryResponse>>>
  abstract rejeitarDeteccao(deteccaoRejeitada: DeteccaoRejeitada): void;
}