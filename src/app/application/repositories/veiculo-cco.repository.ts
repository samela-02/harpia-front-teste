import { Observable } from "rxjs";
import { ResponseData } from "../dtos/response-data.dto";
import { ResponsePaginacao } from "../dtos/response-paginacao.dto";
import { VeiculoCCO } from "@/domain/models/command/veiculo-cco";
import { VeiculoCCOFilter } from "@/domain/filters/veiculoCCO/veiculoCCO.filter";
import { VeiculoCCOQueryResponse } from "@/domain/models/query/veiculo-cco-query-response";

export abstract class VeiculoCCORepository {
  public abstract criarVeiculoCCO(veiculo: VeiculoCCO): Observable<void>;
  public abstract editarVeiculoCCO(cdVeiculo: number, veiculo: VeiculoCCO): Observable<void>;
  public abstract buscarVeiculosCCO(filter?: VeiculoCCOFilter): Observable<ResponseData<ResponsePaginacao<VeiculoCCOQueryResponse>>>
  public abstract desativarVeiculoCCO(cdVeiculo: number): Observable<void>;
}
