import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { SetarBreadcrumbAction } from "../actions/breadcrumb.action";

export class BreadcrumbStateModel {
   breadcrumb: string
}

@State<BreadcrumbStateModel>({
  name: "breadcrumb",
  defaults: {
    breadcrumb: null
  }
})

@Injectable()
export class BreadcrumbState {

  @Action(SetarBreadcrumbAction)
  setarBreadcrumb({ getState, setState }: StateContext<BreadcrumbStateModel>,
    { payload }: SetarBreadcrumbAction) {
    const state = getState();
    setState({
      ...state,
      breadcrumb: payload
    });
  }
}
