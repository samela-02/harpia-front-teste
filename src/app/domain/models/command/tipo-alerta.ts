export class TipoAlerta {
  cdListaAlerta: number | null;
  nmTipoAlerta: string;
  dsTipoAlerta: string;
  nvAlerta: number;

  constructor(
    cdListaAlerta: number,
    nmTipoAlerta: string,
    dsTipoAlerta: string,
    nvAlerta: number,
  ) {
    this.cdListaAlerta = cdListaAlerta,
    this.dsTipoAlerta = dsTipoAlerta,
    this.nmTipoAlerta = nmTipoAlerta,
    this.nvAlerta = nvAlerta
  }
}
