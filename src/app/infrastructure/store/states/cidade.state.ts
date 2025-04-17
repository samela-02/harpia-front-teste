import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { FindCidadesUseCase } from "@/application/usecase/cidade/find-cidades.usecase";
import { CidadeQueryResponse } from "@/domain/models/query/cidade-query-response";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { FindCidadesAction } from "../actions/cidade.actions";
import { Observable, tap } from "rxjs";

export class CidadeStateModel {
  cidades: ResponsePaginacao<CidadeQueryResponse> | null;
}

@State<CidadeStateModel>({
  name: "cidade",
  defaults: {
    cidades: null
  }
})

@Injectable()
export class CidadeState {
  constructor(private findCidadesUseCase: FindCidadesUseCase) { }

  @Action(FindCidadesAction)
  public findCidades({ getState, setState }: StateContext<CidadeStateModel>, { filter }: FindCidadesAction):
    Observable<ResponsePaginacao<CidadeQueryResponse>> {
    return this.findCidadesUseCase
      .execute(filter)
      .pipe(
        tap({
          next: (response: ResponsePaginacao<CidadeQueryResponse>) => {
            const state = getState();
            const dados = response.dados.length;
            setState({
              ...state,
              cidades: dados ? response : null
            })
          }, error: () => {
            setState({
              cidades: null
            })
          }
        })
      );
  }
}