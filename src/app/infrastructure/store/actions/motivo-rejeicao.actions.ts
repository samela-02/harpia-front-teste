import { MotivoRejeicaoFilter } from "@/domain/filters/motivo-rejeicao/motivo-rejeicao.filter";

const scope = "[MotivoRejeicao]"

export class FindMotivoRejeicaoAction {
    static readonly type = `${scope} FindAll`;
    constructor(public filter?: MotivoRejeicaoFilter) {}
}