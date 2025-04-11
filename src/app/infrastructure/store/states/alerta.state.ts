import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { BuscarAlertasUseCase } from "@/application/usecase/alerta/buscar-alertas.usecase";
import { AlertaQueryResponse } from "@/domain/models/query/alerta-query-response";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Observable, tap } from "rxjs";
import { BuscarAlertaAction, BuscarVeiculoPorPlacaAction } from "../actions/alerta.actions";
import { VeiculoDeteccaoQueryResponse } from "@/domain/models/query/veiculo-deteccao-query-response";
import { BuscarVeiculoPorPlacaUseCase } from "@/application/usecase/alerta/buscar-veiculo-por-placa.usecase";

export class AlertaStateModel {
  alertas: ResponseData<ResponsePaginacao<AlertaQueryResponse>> | null;
  veiculoDeteccao: ResponseData<VeiculoDeteccaoQueryResponse> | null;
}

@State<AlertaStateModel>({
  name: "alerta",
  defaults: {
    alertas: null,
    veiculoDeteccao:null
  }
})

@Injectable()
export class AlertaState {
  constructor(private buscarAlertaUseCase: BuscarAlertasUseCase, private buscarVeiculoPorPlacaUseCase: BuscarVeiculoPorPlacaUseCase) {}

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

  @Action(BuscarVeiculoPorPlacaAction)
  buscarVeiculoPorVeiculo({ getState, setState }: StateContext<AlertaStateModel>,
    { payload }: BuscarVeiculoPorPlacaAction): Observable<ResponseData<VeiculoDeteccaoQueryResponse>> {
    return this.buscarVeiculoPorPlacaUseCase.execute(payload).pipe(
      tap((response: ResponseData<VeiculoDeteccaoQueryResponse>) => {
        const state = getState();
        setState({
          ...state,
          veiculoDeteccao: response,
        });
      }),
    );
  }
}
