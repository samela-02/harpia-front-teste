export class ResponsePaginacao<T> {
  totalItens: number;
  totalResposta: number;
  dados: T[];

  constructor(totalItens: number, totalResposta: number, conteudo: T[]) {
    this.totalItens = totalItens;
    this.totalResposta = totalResposta;
    this.dados = conteudo;
  }
}
