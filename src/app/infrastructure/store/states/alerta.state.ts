import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Observable, tap } from "rxjs";
import { ListaAlertaResponse } from "@/domain/models/query/lista-alerta-response";
import { BuscarListaAlertaUseCase } from "@/application/usecase/lista-alerta/buscar-lista-alertas.usecase";
import { BuscarListaAlertaAction, SetarCdListaAlertaAction } from "../actions/lista-alerta.actions";
import { AlertaQueryResponse } from "@/domain/models/query/alerta-query-response";
import { BuscarAlertasUseCase } from "@/application/usecase/alerta/buscar-alertas.usecase";
import { BuscarAlertaAction } from "../actions/alerta.actions";

export class AlertaStateModel {
   alertas: ResponseData<ResponsePaginacao<AlertaQueryResponse>> | null;
}

@State<AlertaStateModel>({
  name: "alerta",
  defaults: {
    alertas: null,
  }
})

@Injectable()
export class AlertaState {
  constructor(private buscarAlertaUseCase: BuscarAlertasUseCase) {}

  @Action(BuscarAlertaAction)
  buscarAlertas({ getState, setState }: StateContext<AlertaStateModel>,
    { payload }: BuscarAlertaAction): Observable<ResponseData<ResponsePaginacao<AlertaQueryResponse>>> {
      return this.buscarAlertaUseCase.execute(payload).pipe(
        tap((response: ResponseData<ResponsePaginacao<AlertaQueryResponse>>) => {
          const state = getState();
          const dados = response.data.dados.length
        setState({
          ...state,
          alertas: dados ? response : null,
        });
      }),
    );
  }
}
