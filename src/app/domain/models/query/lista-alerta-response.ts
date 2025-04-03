export class ListaAlertaResponse {
  nmListaAlerta: string;
  dsListaAlerta: string;
  cdListaAlerta: number;
  dtCriacao: Date;

  constructor(
    nmListaAlerta: string,
    dsListaAlerta: string,
    cdListaAlerta: number,
    dtCriacao: Date
  ) {
    this.nmListaAlerta = nmListaAlerta
    this.dsListaAlerta = dsListaAlerta;
    this.cdListaAlerta = cdListaAlerta;
    this.dtCriacao = dtCriacao;
  }
}