import { EquipamentosFilter } from "@/domain/filters/equipamento/equipamento.filter";

const scope = "[Equipamento]";
export class BuscarEquipamentosAction {
  static readonly type = `${scope} Buscar`;
  constructor(public payload?: EquipamentosFilter) { }
}
