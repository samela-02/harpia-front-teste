export class ObservacaoDeteccao {
    cdDeteccao: number;
    dsMovimentacaoDeteccao: string;

    constructor(cdDeteccao: number, dsMovimentacaoDeteccao: string) {
        this.cdDeteccao = cdDeteccao;
        this.dsMovimentacaoDeteccao = dsMovimentacaoDeteccao;
    }
}