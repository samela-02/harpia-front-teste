import { Selector } from "@ngxs/store";
import { AlertaState, AlertaStateModel, VeiculoState, VeiculoStateModel } from "../states/alerta.state";

export class AlertaSelectors {
  @Selector([AlertaState])
  static alertas(state: AlertaStateModel) {
    return state.alertas
  }

  @Selector([AlertaState])
  static alertasSelect(state: AlertaStateModel) {
    return state.alertas.data.dados
  }

  @Selector([VeiculoState])
  static veiculo(state: VeiculoStateModel) {
    return state.veiculoDeteccao
  }
}