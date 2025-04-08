export class Componente {
  cdComponente?: number | null;
  cdTipoComponente: number;
  cdEquipamento: number;
  idComponente: string;
  nmComponente: string;
  lgAtivo?: number;
  dtDelecao?: Date;

  constructor(
    cdEquipamento: number,
    nmComponente: string,
    idComponente: string,
    cdTipoComponente: number,
    dtDelecao?: Date,
    cdComponente?: number | null,
    lgAtivo?: number
  ) {
    this.cdEquipamento = cdEquipamento,
      this.nmComponente = nmComponente,
      this.idComponente = idComponente,
      this.dtDelecao = dtDelecao,
      this.cdComponente = cdComponente,
      this.cdTipoComponente = cdTipoComponente,
      this.lgAtivo = lgAtivo
  }
}
