import { DeteccaoFilter } from "@/domain/filters/deteccao/deteccao.filter";

const scope = "[Deteccao]";

export class BuscarDeteccoesAction {
    static readonly type = `${scope} Buscar`;
    constructor(public filter?: DeteccaoFilter) {}
}