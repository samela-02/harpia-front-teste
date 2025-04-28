import { Selector } from "@ngxs/store";
import { VeiculoCCOState, VeiculoCCOStateModel } from "../states/veiculo-cco.state";

export class VeiculoCCOSelectors {
  @Selector([VeiculoCCOState])
  static veiculosCCO(state: VeiculoCCOStateModel) {
    return state.veiculo
  }

  @Selector([VeiculoCCOState])
  static veiculosCCOSelect(state: VeiculoCCOStateModel) {
    return state.veiculo.data.dados
  }
}

