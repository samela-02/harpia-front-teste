import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { BuscarEquipamentosUseCase } from "@/application/usecase/equipamento/buscar-equipamentos.usecase";
import { Equipamento } from "@/domain/models/command/equipamento";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Observable, tap } from "rxjs";
import { BuscarEquipamentosAction } from "../actions/equipamento.actions";

export class EquipamentoStateModel {
   equipamentos: ResponseData<ResponsePaginacao<Equipamento>> | null;
}

@State<EquipamentoStateModel>({
  name: "equipamentos",
  defaults: {
    equipamentos: null
  }
})

@Injectable()
export class EquipamentoState {
  constructor(private buscarEquipamentosUseCase: BuscarEquipamentosUseCase) {}

  @Action(BuscarEquipamentosAction)
  buscarsEquipamentos({ getState, setState }: StateContext<EquipamentoStateModel>,
    { payload }: BuscarEquipamentosAction): Observable<ResponseData<ResponsePaginacao<Equipamento>>> {
    return this.buscarEquipamentosUseCase.execute(payload).pipe(
      tap((response: ResponseData<ResponsePaginacao<Equipamento>>) => {
        const state = getState();
        setState({
          ...state,
          equipamentos: response,
        });
      }),
    );
  }
}
