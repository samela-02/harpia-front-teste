import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { FindMotivoRejeicaoUseCase } from "@/application/usecase/motivo-rejeicao/find-motivo-rejeicao.usecase";
import { MotivoRejeicaoQueryResponse } from "@/domain/models/query/motivo-rejeicao-query-response";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { FindMotivoRejeicaoAction } from "../actions/motivo-rejeicao.actions";
import { Observable, tap } from "rxjs";

export class MotivoRejeicaoStateModel {
    motivoRejeicao: MotivoRejeicaoQueryResponse[] | null;
}

@State<MotivoRejeicaoStateModel>({
    name: "motivoRejeicao",
    defaults: {
        motivoRejeicao: null
    }
})
@Injectable()
export class MotivoRejeicaoState {
    constructor(private _findMotivoRejeicaoUseCase: FindMotivoRejeicaoUseCase) {}

    @Action(FindMotivoRejeicaoAction)
    public findMotivoRejeicao({ getState, setState }: StateContext<MotivoRejeicaoStateModel>, { filter }: FindMotivoRejeicaoAction):
            Observable<ResponseData<ResponsePaginacao<MotivoRejeicaoQueryResponse>>> {
        return this._findMotivoRejeicaoUseCase
                .execute(filter)
                .pipe(
                    tap({
                        next: (response: ResponseData<ResponsePaginacao<MotivoRejeicaoQueryResponse>>) => {
                            const state = getState()
                            const dados = response.data.dados;
                            setState({
                                ...state,
                                motivoRejeicao: dados != null ? dados : null
                            })
                        },
                        error: () => {
                            setState({
                                motivoRejeicao: null
                            })
                        }
                    })
                )
    }
}