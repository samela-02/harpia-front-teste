export class Equipamento {
  cdTipoEquipamento?: number | null;
  nmTipoEquipamento: string;
  lgAtivo?: number;

  constructor(
    nmTipoEquipamento: string,
    nmInstituicao: string,
    txtObservacao: string,
    cdTipoEquipamento?: number | null,
    lgAtivo?: number
  ) {
    this.cdTipoEquipamento = cdTipoEquipamento;
    this.nmTipoEquipamento = nmTipoEquipamento;
    this.lgAtivo = lgAtivo;
  }
}
