export class EquipamentoComunicacaoQueryResponse {
    private idInstituicao: string;
    private idEquipamento: string;
    private dtUltimaComunicacao: Date;

    constructor(idInstituicao: string, idEquipamento: string, dtUltimaComunicacao: Date) {
        this.idInstituicao = idInstituicao;
        this.idEquipamento = idEquipamento;
        this.dtUltimaComunicacao = dtUltimaComunicacao;
    }

    public get getIdInstituicao(): string {
        return this.idInstituicao;
    }

    public get getIdEquipamento(): string {
        return this.idEquipamento;
    }

    public get getDtUltimaComunicacao(): Date {
        return this.dtUltimaComunicacao;
    }
}