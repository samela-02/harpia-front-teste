export class Equipamento {
  cdEquipamento?: number | null;
  cdTipoEquipamento: number;
  cdInstituicao: number;
  nmEquipamento: string;
  idEquipamento: string;
  dtAlocacao?: Date;
  nrSerie: string;
  lgAtivo?: number;

  constructor(
    cdInstituicao: number,
    nmEquipamento: string,
    idEquipamento: string,
    nrSerie: string,
    cdTipoEquipamento: number,
    dtAlocacao?: Date,
    cdEquipamento?: number | null,
    lgAtivo?: number
  ) {
    this.cdInstituicao = cdInstituicao,
    this.nmEquipamento = nmEquipamento,
    this.idEquipamento = idEquipamento,
    this.nrSerie = nrSerie
    this.dtAlocacao =  dtAlocacao,
    this.cdEquipamento = cdEquipamento,
    this.cdTipoEquipamento = cdTipoEquipamento,
    this.lgAtivo = lgAtivo
  }
}
