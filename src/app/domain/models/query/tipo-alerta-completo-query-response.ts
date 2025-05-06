export class TipoAlertaCompletoQueryResponse {
  cdListaAlerta: number;
  nmTipoAlerta: string;
  tpNivelAlerta: number

  constructor(
    cdListaAlerta: number,
    nmTipoAlerta: string,
    tpNivelAlerta: number,
  ) {
    this.cdListaAlerta = cdListaAlerta,
      this.nmTipoAlerta = nmTipoAlerta,
      this.tpNivelAlerta = tpNivelAlerta
  }
}
