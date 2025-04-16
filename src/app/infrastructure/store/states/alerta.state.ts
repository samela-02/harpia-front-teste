import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { BuscarAlertasUseCase } from "@/application/usecase/alerta/buscar-alertas.usecase";
import { BuscarVeiculoPorPlacaUseCase } from "@/application/usecase/alerta/buscar-veiculo-por-placa.usecase";
import { AlertaQueryResponse } from "@/domain/models/query/alerta-query-response";
import { VeiculoDeteccaoQueryResponse } from "@/domain/models/query/veiculo-deteccao-query-response";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Observable, tap } from "rxjs";
import { BuscarAlertaAction, BuscarVeiculoPorPlacaAction } from "../actions/alerta.actions";

export class AlertaStateModel {
  alertas: ResponseData<ResponsePaginacao<AlertaQueryResponse>> | null;
}

export class VeiculoStateModel {
  veiculoDeteccao: ResponseData<VeiculoDeteccaoQueryResponse> | null;
}

@State<AlertaStateModel>({
  name: "alerta",
  defaults: {
    alertas: null,
  }
})

@State<VeiculoStateModel>({
  name: "veiculoDeteccao",
  defaults: {
    veiculoDeteccao: null
  }
})

@Injectable()
export class AlertaState {
  constructor(private buscarAlertaUseCase: BuscarAlertasUseCase) { }

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
@Injectable()
export class VeiculoState {
  constructor(private buscarVeiculoPorPlacaUseCase: BuscarVeiculoPorPlacaUseCase) { }
    @Action(BuscarVeiculoPorPlacaAction)
    buscarVeiculoPorVeiculo({ getState, setState }: StateContext<VeiculoStateModel>,
      { payload }: BuscarVeiculoPorPlacaAction): Observable<ResponseData<VeiculoDeteccaoQueryResponse>> {
      return this.buscarVeiculoPorPlacaUseCase.execute(payload).pipe(
        tap((response: ResponseData<VeiculoDeteccaoQueryResponse>) => {
          setState({
            veiculoDeteccao: response ? response : null
          });
        }),
      )
    }
}
