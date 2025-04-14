import { CidadeFilter } from "@/domain/filters/cidade/cidade.filter";

const scope = "[Cidade]";

export class FindCidadesAction {
    static readonly type = `${scope} find`;
    constructor(public filter?: CidadeFilter) {}
}