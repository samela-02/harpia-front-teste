export class MovimentacaoDeteccaoQueryResponse {
    cdMovimentacaoDeteccao: number;
    cdDeteccao: number;
    nmEmailUsuario: string;
    dsMotivoRejeicao: string | null;
    dsMovimentacaoDeteccao: string;
    dtMovimentacaoDeteccao: string;
    tpMovimentacaoDeteccao: string;

    constructor(
        cdMovimentacaoDeteccao: number,
        cdDeteccao: number,
        nmEmailUsuario: string,
        dsMotivoRejeicao: string | null,
        dsMovimentacaoDeteccao: string,
        dtMovimentacaoDeteccao: string,
        tpMovimentacaoDeteccao: string
    ) {
        this.cdMovimentacaoDeteccao = cdMovimentacaoDeteccao;
        this.cdDeteccao = cdDeteccao;
        this.nmEmailUsuario = nmEmailUsuario;
        this.dsMotivoRejeicao = dsMotivoRejeicao;
        this.dsMovimentacaoDeteccao = dsMovimentacaoDeteccao;
        this.dtMovimentacaoDeteccao = dtMovimentacaoDeteccao;
        this.tpMovimentacaoDeteccao = tpMovimentacaoDeteccao;
    }
}