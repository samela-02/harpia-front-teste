import { Selector } from "@ngxs/store";
import { ComponenteState, ComponenteStateModel } from "../states/componente.state";

export class ComponenteSelectors {
  @Selector([ComponenteState])
  static componentes(state: ComponenteStateModel) {
    return state.componentes
  }
}

