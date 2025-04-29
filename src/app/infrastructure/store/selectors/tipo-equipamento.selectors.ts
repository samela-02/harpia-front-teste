import { Selector } from "@ngxs/store";
import { TipoEquipamentoState, TipoEquipamentoStateModel } from "../states/tipo-equipamento.state";

export class TipoEquipamentoSelectors {
  @Selector([TipoEquipamentoState])
  static tiposEquipamentos(state: TipoEquipamentoStateModel) {
    return state.tipoEquipamentos
  }

  @Selector([TipoEquipamentoState])
  static tiposEquipamentosSelect(state: TipoEquipamentoStateModel) {
    return state.tipoEquipamentos.data.dados
  }
}

