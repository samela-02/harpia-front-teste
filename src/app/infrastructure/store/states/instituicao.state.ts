import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { BuscarInstituicoesUseCase } from "@/application/usecase/instituicao/buscar-instituicoes.usecase";
import { Instituicao } from "@/domain/models/command/instituicao";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { BuscarInstituicoesAction } from "../actions/instituicao.actions";
import { Observable, tap } from "rxjs";

export class InstituicaoStateModel {
  instituicoes: ResponseData<ResponsePaginacao<Instituicao>> | null;
}

@State<InstituicaoStateModel>({
  name: "instituicoes",
  defaults: {
    instituicoes: null
  }
})

@Injectable()
export class InstituicaoState {
  constructor(private buscarInstituicoesUseCase: BuscarInstituicoesUseCase) { }

  @Action(BuscarInstituicoesAction)
  buscarInstituicoes({ getState, setState }: StateContext<InstituicaoStateModel>,
    { payload }: BuscarInstituicoesAction): Observable<ResponseData<ResponsePaginacao<Instituicao>>> {
    return this.buscarInstituicoesUseCase.execute(payload).pipe(
      tap({
        next: (response: ResponseData<ResponsePaginacao<Instituicao>>) => {
          const state = getState();
          setState({
            ...state,
            instituicoes: response,
          });
        }, error: () => {
          setState({
            instituicoes: null
          })
        }
      }),
    );
  }
}
