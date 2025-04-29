export class Alerta {
  cdAlerta?: number
  cdListaAlerta: number;
  cdTipoAlerta: number;
  cdVeiculo: number;
  dtAlerta: string;
  dsAlerta: string;

  constructor(
    cdListaAlerta: number,
    cdTipoAlerta: number,
    cdVeiculo: number,
    dtAlerta: string,
    dsAlerta: string
  ) {
    this.cdListaAlerta = cdListaAlerta;
    this.cdTipoAlerta = cdTipoAlerta
    this.cdVeiculo = cdVeiculo;
    this.dtAlerta = dtAlerta;
    this.dsAlerta = dsAlerta
  }
}