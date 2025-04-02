import { Selector } from "@ngxs/store";
import { InstituicaoState, InstituicaoStateModel } from "../states/instituicao.state";
import { BreadcrumbState, BreadcrumbStateModel } from "../states/breadcrumb.state";

export class BreadcrumbSelectors {
  @Selector([BreadcrumbState])
  static breadcrumb(state: BreadcrumbStateModel) {
    return state.breadcrumb
  }
}