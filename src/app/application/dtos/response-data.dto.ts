export class ResponseData<T> {
    dados: T;
    messagem: string;

    constructor(dados: T, messagem: string) {
        this.dados = dados;
        this.messagem = messagem;
    }
}

