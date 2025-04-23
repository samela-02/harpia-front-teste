import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Observable, tap } from "rxjs";
import { DeteccaoQueryResponse } from "@/domain/models/query/deteccao-query-response";
import { BuscarDeteccoesUseCase } from "@/application/usecase/deteccao/buscar-deteccoes.usecase";
import { BuscarDeteccoesAction } from "../actions/deteccao.actions";

export class DeteccaoStateModel {
  deteccoes: ResponseData<ResponsePaginacao<DeteccaoQueryResponse>> | null;
}

@State<DeteccaoStateModel>({
  name: "deteccoes",
  defaults: {
    deteccoes: null
  }
})

@Injectable()
export class DeteccaoState {
  constructor(private buscarDeteccoesUseCase: BuscarDeteccoesUseCase) { }

  @Action(BuscarDeteccoesAction)
  buscarDeteccoes({ setState }: StateContext<DeteccaoStateModel>,
    { filter }: BuscarDeteccoesAction): Observable<ResponseData<ResponsePaginacao<DeteccaoQueryResponse>>> {
    return this.buscarDeteccoesUseCase.execute(filter).pipe(
      tap({
        next: (response: ResponseData<ResponsePaginacao<DeteccaoQueryResponse>>) => {
          setState({
            deteccoes: response ? response : null,
          });
        }, error: () => {
          setState({
            deteccoes: null
          })
        }
      }),
    );
  }
}
