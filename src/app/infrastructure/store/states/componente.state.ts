import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Observable, tap } from "rxjs";
import { EquipamentoQuery } from "@/domain/models/query/equipamento";
import { Componente } from "@/domain/models/command/componentes";
import { BuscarComponentesUseCase } from "@/application/usecase/componente/buscar-componentes.usecase";
import { BuscarComponentesAction } from "../actions/componente.actions";

export class ComponenteStateModel {
  componentes: ResponseData<ResponsePaginacao<Componente>> | null;
}

@State<ComponenteStateModel>({
  name: "componentes",
  defaults: {
    componentes: null
  }
})

@Injectable()
export class ComponenteState {
  constructor(private buscarComponentesUseCase: BuscarComponentesUseCase) {}

  @Action(BuscarComponentesAction)
  buscarsComponentes({ getState, setState }: StateContext<ComponenteStateModel>,
    { payload }: BuscarComponentesAction): Observable<ResponseData<ResponsePaginacao<Componente>>> {
    return this.buscarComponentesUseCase.execute(payload).pipe(
      tap((response: ResponseData<ResponsePaginacao<Componente>>) => {
        const state = getState();
        setState({
          ...state,
          componentes: response,
        });
      }),
    );
  }
}
