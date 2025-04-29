import { Selector } from "@ngxs/store";
import { DeteccaoState, DeteccaoStateModel } from "../states/deteccao.state";

export class DeteccaoSelector {
  @Selector([DeteccaoState])
  static buscarDeteccoes(state: DeteccaoStateModel) {
    return state.deteccoes
  }
}