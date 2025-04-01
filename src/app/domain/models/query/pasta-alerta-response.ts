export class PastaAlertaResponse {
  nmPastaAlerta: string;
  dsPastaAlerta: string;
  cdPastaAlerta: number;
  dtCriacao: Date;

  constructor(
    nmPastaAlerta: string,
    dsPastaAlerta: string,
    cdPastaAlerta: number,
    dtCriacao: Date
  ) {
    this.nmPastaAlerta = nmPastaAlerta
    this.dsPastaAlerta = dsPastaAlerta;
    this.cdPastaAlerta = cdPastaAlerta;
    this.dtCriacao = dtCriacao;
  }
}