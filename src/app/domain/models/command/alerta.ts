export class Alerta {
  cdListaAlerta: number;
  cdTipoAlerta: number;
  cdVeiculo: number;
  dtAlerta: Date;
  dsAlerta: string;

  constructor(
    cdListaAlerta: number,
    cdTipoAlerta: number,
    cdVeiculo: number,
    dtAlerta: Date,
    dsAlerta: string
  ) {
    this.cdListaAlerta = cdListaAlerta;
    this.cdTipoAlerta = cdTipoAlerta
    this.cdVeiculo = cdVeiculo;
    this.dtAlerta = dtAlerta;
    this.dsAlerta = dsAlerta
  }
}