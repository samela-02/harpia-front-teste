import { Selector } from "@ngxs/store";
import { ListaAlertaState, ListaAlertaStateModel } from "../states/lista-alerta.state";

export class ListaAlertaSelectors {
  @Selector([ListaAlertaState])
  static listaAlerta(state: ListaAlertaStateModel) {
    return state.listaAlerta
  }

  @Selector([ListaAlertaState])
  static listaAlertaSelect(state: ListaAlertaStateModel) {
    return state.listaAlerta.data.dados
  }
}