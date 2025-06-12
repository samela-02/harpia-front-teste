import { Selector } from "@ngxs/store";
import { MotivoRejeicaoState, MotivoRejeicaoStateModel } from "../states/motivo-rejeicao.state";

export class MotivoRejeicaoSelector {
    @Selector([MotivoRejeicaoState])
    static findMotivoRejeicao(state: MotivoRejeicaoStateModel) {
        return state?.motivoRejeicao
    }
}