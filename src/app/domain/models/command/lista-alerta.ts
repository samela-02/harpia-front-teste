export class ListaAlerta {
  nmListaAlerta: string;
  dsListaAlerta: string;
  cdListaAlerta?: number | null;

  constructor(
    nmListaAlerta: string,
    dsListaAlerta: string,
    cdListaAlerta?: number
  ) {
    this.nmListaAlerta = nmListaAlerta
    this.dsListaAlerta = dsListaAlerta;
    this.cdListaAlerta = cdListaAlerta;

  }
}