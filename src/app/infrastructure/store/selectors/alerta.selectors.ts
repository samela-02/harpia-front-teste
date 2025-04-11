import { Selector } from "@ngxs/store";
import { AlertaState, AlertaStateModel } from "../states/alerta.state";

export class AlertaSelectors {
  @Selector([AlertaState])
  static alertas(state: AlertaStateModel) {
    return state.alertas
  }

  @Selector([AlertaState])
  static alertasSelect(state: AlertaStateModel) {
    return state.alertas.data.dados
  }

  @Selector([AlertaState])
  static veiculo(state: AlertaStateModel) {
    return state.veiculoDeteccao
  }
}