import { Selector } from "@ngxs/store";
import { InstituicaoState, InstituicaoStateModel, InstituicaoVinculadaStateModel } from "../states/instituicao.state";

export class InstituicaoSelectors {
  @Selector([InstituicaoState])
  static instituicao(state: InstituicaoStateModel) {
    return state.instituicoes
  }

  @Selector([InstituicaoState])
  static instituicaoVinculadas(state: InstituicaoVinculadaStateModel) {
    return state.instituicoesVinculadas
  }

  @Selector([InstituicaoState])
  static instituicaoSelect(state: InstituicaoStateModel) {
    return state.instituicoes?.data?.dados
  }
}