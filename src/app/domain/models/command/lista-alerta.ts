export class ListaAlerta {
  nmListaAlerta: string;
  dsListaAlerta: string;
  idInstituicao: string;
  cdListaAlerta?: number | null;

  constructor(
    nmListaAlerta: string,
    dsListaAlerta: string,
    idInstituicao: string,
    cdListaAlerta?: number
  ) {
    this.nmListaAlerta = nmListaAlerta
    this.dsListaAlerta = dsListaAlerta;
    this.idInstituicao = idInstituicao
    this.cdListaAlerta = cdListaAlerta;

  }
}