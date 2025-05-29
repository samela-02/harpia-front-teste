export class EquipamentoComunicacaoQueryResponse {
    idInstituicao: string;
    idEquipamento: string;
    dtUltimaComunicacao: Date;

    constructor(idInstituicao: string, idEquipamento: string, dtUltimaComunicacao: Date) {
        this.idInstituicao = idInstituicao;
        this.idEquipamento = idEquipamento;
        this.dtUltimaComunicacao = dtUltimaComunicacao;
    }
}