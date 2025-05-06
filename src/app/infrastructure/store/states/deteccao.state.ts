import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Observable, tap } from "rxjs";
import { DeteccaoQueryResponse } from "@/domain/models/query/deteccao-query-response";
import { BuscarDeteccoesUseCase } from "@/application/usecase/deteccao/buscar-deteccoes.usecase";
import { BuscarDeteccoesAction } from "../actions/deteccao.actions";
import { AlertaCompletoQueryResponse } from "@/domain/models/query/alerta-completo-query-reponse";
import { buscarAlertaPorCdAction } from "../actions/alerta.actions";
import { BuscarAlertaPorCdUseCase } from "@/application/usecase/alerta/buscar-alerta-por-cd.usecase";

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
  constructor(private buscarDeteccoesUseCase: BuscarDeteccoesUseCase, private buscarAlertaPorCdUseCase: BuscarAlertaPorCdUseCase) { }

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
