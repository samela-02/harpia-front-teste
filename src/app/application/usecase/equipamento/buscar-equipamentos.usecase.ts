import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { EquipamentoRepository } from "@/application/repositories/equipamento.repository";
import { EquipamentosFilter } from "@/domain/filters/equipamento/equipamento.filter";
import { Equipamento } from "@/domain/models/command/equipamento";
import { Observable } from "rxjs";

export class BuscarEquipamentosUseCase {
  constructor(private equipamentosRepository: EquipamentoRepository) { }

  public execute(filter?: EquipamentosFilter): Observable<ResponseData<ResponsePaginacao<Equipamento>>> {
    return this.equipamentosRepository.buscarEquipamentos(filter)
  }
}
