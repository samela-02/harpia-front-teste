import { CidadeFilter } from "@/domain/filters/cidade/cidade.filter";
import { VeiculoCCOFilter } from "@/domain/filters/veiculoCCO/veiculoCCO.filter";

const scope = "[VeiculoCCO]";

export class BUscarVeiculosCCOAction {
    static readonly type = `${scope} find`;
    constructor(public filter?: VeiculoCCOFilter) {}
}