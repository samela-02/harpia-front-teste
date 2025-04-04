export class Equipamento {
  cdEquipamento?: number | null;
  cdInstituicao: number;
  nmEquipamento: string;
  idEquipamento: string;
  dtAlocacao: Date;
  nrSerie: string;
  lgAtivo?: number;

  constructor(
    cdInstituicao: number,
    nmEquipamento: string,
    idEquipamento: string,
    dtAlocacao: Date,
    nrSerie: string,
    cdEquipamento?: number | null,
    lgAtivo?: number
  ) {
    this.cdInstituicao = cdInstituicao,
    this.nmEquipamento = nmEquipamento,
    this.idEquipamento = idEquipamento,
    this.dtAlocacao =  dtAlocacao,
    this.nrSerie = nrSerie
    this.cdEquipamento = cdEquipamento,
    this.lgAtivo = lgAtivo
  }
}
