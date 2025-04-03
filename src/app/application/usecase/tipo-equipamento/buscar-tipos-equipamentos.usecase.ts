import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { TipoEquipamentoRepository } from "@/application/repositories/tipo-equipamento.repository";
import { TipoEquipamentosFilter } from "@/domain/filters/lista-equipamento/tipo-equipamento.filter";
import { TipoEquipamento } from "@/domain/models/tipo-equipamento";
import { Observable } from "rxjs";
import { ResponseData } from "../../dtos/response-data.dto";

export class BuscarTiposEquipamentosUseCase {
  constructor(private tiposEquipamentosRepository: TipoEquipamentoRepository){}

  public execute(filter?: TipoEquipamentosFilter): Observable<ResponseData<ResponsePaginacao<TipoEquipamento>>> {
    return this.tiposEquipamentosRepository.buscarTipoEquipamentos(filter)
  }
}
