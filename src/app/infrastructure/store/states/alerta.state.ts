import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { BuscarAlertasUseCase } from "@/application/usecase/alerta/buscar-alertas.usecase";
import { BuscarVeiculoPorPlacaUseCase } from "@/application/usecase/alerta/buscar-veiculo-por-placa.usecase";
import { AlertaQueryResponse } from "@/domain/models/query/alerta-query-response";
import { VeiculoDeteccaoQueryResponse } from "@/domain/models/query/veiculo-deteccao-query-response";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Observable, tap } from "rxjs";
import { BuscarAlertaAction, buscarAlertaPorCdAction, BuscarVeiculoPorPlacaAction } from "../actions/alerta.actions";
import { AlertaCompletoQueryResponse } from "@/domain/models/query/alerta-completo-query-reponse";
import { BuscarAlertaPorCdUseCase } from "@/application/usecase/alerta/buscar-alerta-por-cd.usecase";
export class AlertaStateModel {
  alertas: ResponseData<ResponsePaginacao<AlertaQueryResponse>> | null;
}

export class AlertaPorCdStateModel {
  alerta: ResponseData<AlertaCompletoQueryResponse> | null
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
  constructor(private buscarAlertaUseCase: BuscarAlertasUseCase, private buscarAlertaPorCdUseCase: BuscarAlertaPorCdUseCase) { }

  @Action(BuscarAlertaAction)
  buscarAlertas({ getState, setState }: StateContext<AlertaStateModel>,
    { payload }: BuscarAlertaAction): Observable<ResponseData<ResponsePaginacao<AlertaQueryResponse>>> {
    return this.buscarAlertaUseCase.execute(payload).pipe(
      tap({
        next: (response: ResponseData<ResponsePaginacao<AlertaQueryResponse>>) => {
          setState({
            alertas: response,
          })
        }, error: () => {
          setState({
            alertas: null
          })
        }
      })
    )
  }

  @Action(buscarAlertaPorCdAction)
  buscarAlertaPorCd({ setState }: StateContext<AlertaPorCdStateModel>,
    { payload }: buscarAlertaPorCdAction): Observable<ResponseData<AlertaCompletoQueryResponse>> {
    setState({
      alerta: null
    })
    return this.buscarAlertaPorCdUseCase.execute(payload).pipe(
      tap({
        next: (response: ResponseData<AlertaCompletoQueryResponse>) => {
          setState({
            alerta: response ? response : null,
          });
        }, error: () => {
          setState({
            alerta: null
          })
        }
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
      tap({
        next: (response: ResponseData<VeiculoDeteccaoQueryResponse>) => {
          setState({
            veiculoDeteccao: response ? response : null
          });
        }, error: () => {
          setState({
            veiculoDeteccao: null
          })
        }
      }),
    )
  }
}
