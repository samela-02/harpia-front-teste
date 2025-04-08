import { ComponentesEquipamentos } from "./componentes-equipamentos";

export class EquipamentoQuery {
  cdEquipamento?: number | null;
  cdTipoEquipamento: number;
  componentes?: ComponentesEquipamentos[]
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
    componentes?: ComponentesEquipamentos[],
    cdEquipamento?: number | null,
    lgAtivo?: number
  ) {
    this.cdInstituicao = cdInstituicao,
    this.nmEquipamento = nmEquipamento,
    this.idEquipamento = idEquipamento,
    this.nrSerie = nrSerie
    this.dtAlocacao =  dtAlocacao,
    this.cdEquipamento = cdEquipamento,
    this.componentes = componentes
    this.cdTipoEquipamento = cdTipoEquipamento,
    this.lgAtivo = lgAtivo
  }
}
