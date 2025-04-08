import { Selector } from "@ngxs/store";
import { EquipamentoState, EquipamentoStateModel } from "../states/equipamento.state";

export class EquipamentoSelectors {
  @Selector([EquipamentoState])
  static equipamentos(state: EquipamentoStateModel) {
    return state.equipamentos
  }

  @Selector([EquipamentoState])
  static equipamentosSelect(state: EquipamentoStateModel) {
    return state.equipamentos.data.dados
  }
}

