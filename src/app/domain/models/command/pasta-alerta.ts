export class PastaAlerta {
  nmPastaAlerta: string;
  dsPastaAlerta: string;
  cdPastaAlerta?: number | null;

  constructor(
    nmPastaAlerta: string,
    dsPastaAlerta: string,
    cdPastaAlerta?: number
  ) {
    this.nmPastaAlerta = nmPastaAlerta
    this.dsPastaAlerta = dsPastaAlerta;
    this.cdPastaAlerta = cdPastaAlerta;

  }
}