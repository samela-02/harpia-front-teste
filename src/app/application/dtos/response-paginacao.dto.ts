export class ResponsePaginacao<T> {
  totalItens: number;
  totalResposta: number;
  pagina: number;
  tamanho: number;
  conteudo: T[];

  constructor(totalItens: number, totalResposta: number, pagina: number, tamanho: number, conteudo: T[]) {
    this.totalItens = totalItens;
    this.totalResposta = totalResposta;
    this.pagina = pagina;
    this.tamanho = tamanho;
    this.conteudo = conteudo;
  }
}
