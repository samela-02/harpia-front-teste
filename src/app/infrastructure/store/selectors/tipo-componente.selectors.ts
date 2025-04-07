import { Selector } from "@ngxs/store";
import { TipoComponenteState, TipoComponenteStateModel } from "../states/tipo-componente.state";

export class TipoComponenteSelectors {
  @Selector([TipoComponenteState])
  static tiposComponentes(state: TipoComponenteStateModel) {
    return state.tipoComponentes
  }

  @Selector([TipoComponenteState])
  static tiposComponentesSelect(state: TipoComponenteStateModel) {
    return state.tipoComponentes.data.dados
  }
}

