export class Instituicao {
  cdInstituicao?: number | null;
  idInstituicao: string;
  nmInstituicao: string;
  txtObservacao: string;
  lgAtivo?: number;

  constructor(
    idInstituicao: string,
    nmInstituicao: string,
    txtObservacao: string,
    cdInstituicao?: number | null,
    lgAtivo?: number
  ) {
    this.cdInstituicao = cdInstituicao;
    this.idInstituicao = idInstituicao;
    this.nmInstituicao = nmInstituicao;
    this.txtObservacao = txtObservacao;
    this.lgAtivo = lgAtivo;
  }
}
