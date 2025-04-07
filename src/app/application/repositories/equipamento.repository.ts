import { EquipamentosFilter } from "@/domain/filters/equipamento/equipamento.filter";
import { Equipamento } from "@/domain/models/command/equipamento";
import { Observable } from "rxjs";
import { ResponseData } from "../dtos/response-data.dto";
import { ResponsePaginacao } from "../dtos/response-paginacao.dto";
import { EquipamentoQuery } from "@/domain/models/query/equipamento";

export abstract class EquipamentoRepository {
  public abstract criarEquipamento(equipamento: Equipamento): Observable<void>;
  public abstract editarEquipamento(cdEquipamento: number, equipamento: Equipamento): Observable<void>;
  public abstract buscarEquipamentos(filter: EquipamentosFilter): Observable<ResponseData<ResponsePaginacao<EquipamentoQuery>>>
  public abstract desativarEquipamento(cdEquipamento: number): Observable<void>;
}
