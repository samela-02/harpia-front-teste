import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Observable, tap } from "rxjs";
import { ListaAlertaResponse } from "@/domain/models/query/lista-alerta-response";
import { BuscarListaAlertaUseCase } from "@/application/usecase/lista-alerta/buscar-lista-alertas.usecase";
import { BuscarListaAlertaAction } from "../actions/lista-alerta.actions";

export class ListaAlertaStateModel {
   listaAlerta: ResponseData<ResponsePaginacao<ListaAlertaResponse>> | null;
}

@State<ListaAlertaStateModel>({
  name: "listaAlerta",
  defaults: {
    listaAlerta: null
  }
})

@Injectable()
export class ListaAlertaState {
  constructor(private buscarListaAlertaUseCase: BuscarListaAlertaUseCase) {}

  @Action(BuscarListaAlertaAction)
  buscarListaAlertas({ getState, setState }: StateContext<ListaAlertaStateModel>,
    { payload }: BuscarListaAlertaAction): Observable<ResponseData<ResponsePaginacao<ListaAlertaResponse>>> {
    return this.buscarListaAlertaUseCase.execute(payload).pipe(
      tap((response: ResponseData<ResponsePaginacao<ListaAlertaResponse>>) => {
        const state = getState();
        setState({
          ...state,
          listaAlerta: response,
        });
      }),
    );
  }
}
