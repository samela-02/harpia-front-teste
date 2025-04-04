import { Selector } from "@ngxs/store";
import { EquipamentoState, EquipamentoStateModel } from "../states/equipamento.state";

export class EquipamentoSelectors {
  @Selector([EquipamentoState])
  static equipamentos(state: EquipamentoStateModel) {
    return state.equipamentos
  }
}

