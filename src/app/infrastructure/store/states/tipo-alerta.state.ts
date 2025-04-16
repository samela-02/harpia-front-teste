import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { BuscarTiposAlertasUseCase } from "@/application/usecase/tipo-alerta/buscar-tipos-alertas.usecase";
import { TipoAlertaQueryResponse } from "@/domain/models/query/tipo-alerta-query-response";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Observable, tap } from "rxjs";
import { BuscarTiposAlertasAction } from "../actions/tipo-alerta.actions";

export class TipoAlertaStateModel {
   tiposAlertas: ResponseData<ResponsePaginacao<TipoAlertaQueryResponse>> | null;
}

@State<TipoAlertaStateModel>({
  name: "tipoAlertas",
  defaults: {
    tiposAlertas: null
  }
})

@Injectable()
export class TipoAlertaState {
  constructor(private buscarTiposAlertasUseCase: BuscarTiposAlertasUseCase) {}

  @Action(BuscarTiposAlertasAction)
  buscarTiposAlertas({ setState }: StateContext<TipoAlertaStateModel>,
    { payload }: BuscarTiposAlertasAction): Observable<ResponseData<ResponsePaginacao<TipoAlertaQueryResponse>>> {
    return this.buscarTiposAlertasUseCase.execute(payload).pipe(
      tap((response: ResponseData<ResponsePaginacao<TipoAlertaQueryResponse>>) => {
        setState({
          tiposAlertas: response ? response : null,
        });
      }),
    );
  }
}
