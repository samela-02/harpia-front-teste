import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Observable, tap } from "rxjs";
import { EquipamentoQuery } from "@/domain/models/query/equipamento";
import { VeiculoCCOQueryResponse } from "@/domain/models/query/veiculo-cco-query-response";
import { BuscarVeiculosCCOUseCase } from "@/application/usecase/veiculo-cco/buscar-veiculos-cco.usecase";
import { BUscarVeiculosCCOAction } from "../actions/veiculo-cco.actions";

export class VeiculoCCOStateModel {
  veiculo: ResponseData<ResponsePaginacao<VeiculoCCOQueryResponse>> | null;
}

@State<VeiculoCCOStateModel>({
  name: "veiculo",
  defaults: {
    veiculo: null
  }
})

@Injectable()
export class VeiculoCCOState {
  constructor(private buscarVeiculoCCOUseCase: BuscarVeiculosCCOUseCase) { }

  @Action(BUscarVeiculosCCOAction)
  buscarsVeiculoCCOs({ getState, setState }: StateContext<VeiculoCCOStateModel>,
    { filter }: BUscarVeiculosCCOAction): Observable<ResponseData<ResponsePaginacao<VeiculoCCOQueryResponse>>> {
    return this.buscarVeiculoCCOUseCase.execute(filter).pipe(
      tap({
        next: (response: ResponseData<ResponsePaginacao<VeiculoCCOQueryResponse>>) => {
          const state = getState();
          setState({
            ...state,
            veiculo: response,
          });
        }, error: () => {
          setState({
            veiculo: null
          })
        }
      }
      ),
    );
  }
}
