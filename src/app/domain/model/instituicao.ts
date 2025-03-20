export class Instituicao {
    cdInstituicao: number | null;
    idInstituicao: string;
    nmInstituicao: string;
    txtObservacao: string;

    constructor(
        cdInstituicao: number | null,
        idInstituicao: string,
        nmInstituicao: string,
        txtObservacao: string
    ) {
        this.cdInstituicao = cdInstituicao;
        this.idInstituicao = idInstituicao;
        this.nmInstituicao = nmInstituicao;
        this.txtObservacao = txtObservacao;
    }
}
