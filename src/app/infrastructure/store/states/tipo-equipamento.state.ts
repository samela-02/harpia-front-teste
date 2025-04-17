import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { BuscarTiposEquipamentosUseCase } from "@/application/usecase/tipo-equipamento/buscar-tipos-equipamentos.usecase";
import { TipoEquipamento } from "@/domain/models/command/tipo-equipamento";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Observable, tap } from "rxjs";
import { BuscarTiposEquipamentosAction } from "../actions/tipo-equipamento.actions";

export class TipoEquipamentoStateModel {
  tipoEquipamentos: ResponseData<ResponsePaginacao<TipoEquipamento>> | null;
}

@State<TipoEquipamentoStateModel>({
  name: "tipoEquipamentos",
  defaults: {
    tipoEquipamentos: null
  }
})

@Injectable()
export class TipoEquipamentoState {
  constructor(private buscarTiposEquipamentosUseCase: BuscarTiposEquipamentosUseCase) { }

  @Action(BuscarTiposEquipamentosAction)
  buscarTiposEquipamentos({ getState, setState }: StateContext<TipoEquipamentoStateModel>,
    { payload }: BuscarTiposEquipamentosAction): Observable<ResponseData<ResponsePaginacao<TipoEquipamento>>> {
    return this.buscarTiposEquipamentosUseCase.execute(payload).pipe(
      tap({
        next: (response: ResponseData<ResponsePaginacao<TipoEquipamento>>) => {
          const state = getState();
          setState({
            ...state,
            tipoEquipamentos: response,
          });
        }, error: () => {
          setState({
            tipoEquipamentos: null
          })
        }
      }),
    );
  }
}
