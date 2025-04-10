import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Observable, tap } from "rxjs";
import { ListaAlertaResponse } from "@/domain/models/query/lista-alerta-response";
import { BuscarListaAlertaUseCase } from "@/application/usecase/lista-alerta/buscar-lista-alertas.usecase";
import { BuscarListaAlertaAction, SetarCdListaAlertaAction } from "../actions/lista-alerta.actions";

export class ListaAlertaStateModel {
   listaAlerta: ResponseData<ResponsePaginacao<ListaAlertaResponse>> | null;
   cdListaAlerta: number | null
}

@State<ListaAlertaStateModel>({
  name: "listaAlerta",
  defaults: {
    listaAlerta: null,
    cdListaAlerta: null
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
          const dados = response.data.dados.length
          console.log(dados)
        setState({
          ...state,
          listaAlerta: dados ? response : null,
        });
      }),
    );
  }

  @Action(SetarCdListaAlertaAction)
  setarCdListaAlerta({ setState }: StateContext<ListaAlertaStateModel>, { payload }: SetarCdListaAlertaAction): void {
    setState({
      listaAlerta: null,
      cdListaAlerta: payload
    });
  }
}
