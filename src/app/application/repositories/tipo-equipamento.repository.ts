import { Observable } from "rxjs";
import { ResponseData } from "../dtos/response-data.dto";
import { ResponsePaginacao } from "../dtos/response-paginacao.dto";
import { TipoEquipamento } from "@/domain/models/command/tipo-equipamento";
import { TipoEquipamentosFilter } from "@/domain/filters/lista-equipamento/tipo-equipamento.filter";

export abstract class TipoEquipamentoRepository {
  public abstract criarTipoEquipamento(Tipo: TipoEquipamento): Observable<void>;
  public abstract editarTipoEquipamento(cdTipoEquipamento: number, TipoEquipamento: TipoEquipamento): Observable<void>;
  public abstract buscarTipoEquipamentos(filter: TipoEquipamentosFilter): Observable<ResponseData<ResponsePaginacao<TipoEquipamento>>>
  public abstract desativarTipoEquipamento(cdTipoEquipamento: number): Observable<void>;
}
