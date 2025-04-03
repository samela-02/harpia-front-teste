import { TipoEquipamentosFilter } from "@/domain/filters/lista-equipamento/tipo-equipamento.filter";

const scope = "[TipoEquipamento]";
export class BuscarTiposEquipamentosAction {
  static readonly type = `${scope} Buscar`;
  constructor(public payload?: TipoEquipamentosFilter) { }
}
