import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { BuscarTiposComponentesUseCase } from "@/application/usecase/tipo-componente/buscar-tipos-componentes.usecase";
import { TipoComponente } from "@/domain/models/command/tipo-componente";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Observable, tap } from "rxjs";
import { BuscarTiposComponentesAction } from "../actions/tipo-componente.actions";

export class TipoComponenteStateModel {
   tipoComponentes: ResponseData<ResponsePaginacao<TipoComponente>> | null;
}

@State<TipoComponenteStateModel>({
  name: "tipoComponentes",
  defaults: {
    tipoComponentes: null
  }
})

@Injectable()
export class TipoComponenteState {
  constructor(private buscarTiposComponentesUseCase: BuscarTiposComponentesUseCase) {}

  @Action(BuscarTiposComponentesAction)
  buscarTiposComponentes({ getState, setState }: StateContext<TipoComponenteStateModel>,
    { payload }: BuscarTiposComponentesAction): Observable<ResponseData<ResponsePaginacao<TipoComponente>>> {
    return this.buscarTiposComponentesUseCase.execute(payload).pipe(
      tap({
        next:(response: ResponseData<ResponsePaginacao<TipoComponente>>) => {
        const state = getState();
        setState({
          ...state,
          tipoComponentes: response,
        });
      }, error: () => {
        setState({
          tipoComponentes: null
        })
      }
    }),
    );
  }
}
