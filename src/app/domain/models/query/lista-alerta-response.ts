class ListaAlertaAcessoQueryResponse {
  idInstituicao: string;
  isOwner: boolean
}
export class ListaAlertaResponse {
  nmListaAlerta: string;
  dsListaAlerta: string;
  cdListaAlerta: number;
  dtCriacao: Date;
  instituicoesComAcesso?: ListaAlertaAcessoQueryResponse[]

  constructor(
    nmListaAlerta: string,
    dsListaAlerta: string,
    cdListaAlerta: number,
    dtCriacao: Date,
    instituicoesComAcesso: ListaAlertaAcessoQueryResponse[]
  ) {
    this.nmListaAlerta = nmListaAlerta
    this.dsListaAlerta = dsListaAlerta;
    this.cdListaAlerta = cdListaAlerta;
    this.dtCriacao = dtCriacao;
    this.instituicoesComAcesso = instituicoesComAcesso
  }
}