export class Instituicao {
  cdInstituicao?: number | null;
  idInstituicao: string;
  nmInstituicao: string;
  txtObservacao: string;
  lgAtivo?: number;
  cdCidade: number;
  nmCidade?: string;

  constructor(
    idInstituicao: string,
    nmInstituicao: string,
    txtObservacao: string,
    cdCidade: number,
    nmCidade: string,
    cdInstituicao?: number | null,
    lgAtivo?: number
  ) {
    this.cdInstituicao = cdInstituicao;
    this.idInstituicao = idInstituicao;
    this.nmInstituicao = nmInstituicao;
    this.txtObservacao = txtObservacao;
    this.lgAtivo = lgAtivo;
    this.cdCidade = cdCidade;
    this.nmCidade = nmCidade;
  }
}
