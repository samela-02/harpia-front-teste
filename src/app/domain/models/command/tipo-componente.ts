export class TipoComponente {
  cdTipoComponente?: number | null;
  nmTipoComponente: string;
  lgAtivo?: number;
  dtDelecao?: Date;

  constructor(
    cdTipoComponente: number,
    nmTipoComponente: string,
    lgAtivo?: number,
    dtDelecao?: Date
  ) {
    this.cdTipoComponente = cdTipoComponente;
    this.nmTipoComponente = nmTipoComponente;
    this.lgAtivo = lgAtivo;
    this.dtDelecao = dtDelecao
  }
}
