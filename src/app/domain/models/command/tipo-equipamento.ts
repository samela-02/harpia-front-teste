export class TipoEquipamento {
  cdTipoEquipamento?: number | null;
  nmTipoEquipamento: string;
  lgAtivo?: number;
  dtDelecao?: Date;

  constructor(
    cdTipoEquipamento: number,
    nmTipoEquipamento: string,
    lgAtivo?: number,
    dtDelecao?: Date
  ) {
    this.cdTipoEquipamento = cdTipoEquipamento;
    this.nmTipoEquipamento = nmTipoEquipamento;
    this.lgAtivo = lgAtivo;
    this.dtDelecao = dtDelecao
  }
}
