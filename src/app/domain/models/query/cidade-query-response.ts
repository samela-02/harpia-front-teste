export class CidadeQueryResponse {
    cdCidade: number;
    idCidade: string;
    nmCidade: string;

    constructor(cdCidade: number, idCidade: string, nmCidade: string) {
        this.cdCidade = cdCidade;
        this.idCidade = idCidade;
        this.nmCidade = nmCidade;
    }
}