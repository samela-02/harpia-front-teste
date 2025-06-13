export class MotivoRejeicaoQueryResponse {
    cdMotivoRejeicao: number;
    dsMotivoRejeicao: string;
    lgAtivo: number;
    dtDelecao: Date;

    constructor(cdMotivoRejeicao: number, dsMotivoRejeicao: string, lgAtivo: number, dtDelecao: Date) {
        this.cdMotivoRejeicao = cdMotivoRejeicao;
        this.dsMotivoRejeicao = dsMotivoRejeicao;
        this.lgAtivo = lgAtivo;
        this.dtDelecao = dtDelecao;
    }
}