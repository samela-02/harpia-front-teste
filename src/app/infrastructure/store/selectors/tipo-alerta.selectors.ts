import { Selector } from "@ngxs/store";
import { TipoAlertaState, TipoAlertaStateModel } from "../states/tipo-alerta.state";

export class TipoAlertaSelectors {
  @Selector([TipoAlertaState])
  static tiposAlertas(state: TipoAlertaStateModel) {
    return state.tiposAlertas
  }

  @Selector([TipoAlertaState])
  static tiposAlertasSelect(state: TipoAlertaStateModel) {
    console.log(state)
    return state.tiposAlertas.data.dados
  }
}

