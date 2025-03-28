import { Selector } from "@ngxs/store";
import { InstituicaoState, InstituicaoStateModel } from "../states/instituicao.state";

export class InstituicaoSelectors {
  @Selector([InstituicaoState])
  static instituicao(state: InstituicaoStateModel) {
    return state.instituicoes
  }
}