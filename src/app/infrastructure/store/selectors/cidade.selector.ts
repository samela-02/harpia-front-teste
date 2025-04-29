import { Selector } from "@ngxs/store";
import { CidadeState, CidadeStateModel } from "../states/cidade.state";

export class CidadeSelectors {
    @Selector([CidadeState])
    static findCidades(state: CidadeStateModel) {
        return state?.cidades?.dados
    }
}