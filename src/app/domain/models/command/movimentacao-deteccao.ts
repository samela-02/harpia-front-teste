export class MovimentacaoDeteccao {
    cdDeteccao: number;
    cdMotivoRejeicao: number;
    dsMovimentacaoDeteccao: string;

    constructor(cdDeteccao: number, cdMotivoRejeicao: number, dsMovimentacaoDeteccao: string) {
        this.cdDeteccao = cdDeteccao;
        this.cdMotivoRejeicao = cdMotivoRejeicao;
        this.dsMovimentacaoDeteccao = dsMovimentacaoDeteccao;
    }
}