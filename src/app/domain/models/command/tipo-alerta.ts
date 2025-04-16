export class TipoAlerta {
  cdListaAlerta: number | null;
  nmTipoAlerta: string;
  dsTipoAlerta: string;
  nvTipoAlerta: number;

  constructor(
    cdListaAlerta: number,
    nmTipoAlerta: string,
    dsTipoAlerta: string,
    nvTipoAlerta: number,
  ) {
    this.cdListaAlerta = cdListaAlerta,
    this.dsTipoAlerta = dsTipoAlerta,
    this.nmTipoAlerta = nmTipoAlerta,
    this.nvTipoAlerta = nvTipoAlerta
  }
}
