import { Instituicao } from "../models/instituicao";

export class InstituicaoBuilder {
  private cdInstituicao?: number | null = null;
  private idInstituicao: string = '';
  private nmInstituicao: string = '';
  private txtObservacao: string = '';
  private lgAtivo?: number = 1;

  withCdInstituicao(cdInstituicao: number | null): InstituicaoBuilder {
    this.cdInstituicao = cdInstituicao;
    return this;
  }

  withIdInstituicao(idInstituicao: string): InstituicaoBuilder {
    this.idInstituicao = idInstituicao;
    return this;
  }

  withNmInstituicao(nmInstituicao: string): InstituicaoBuilder {
    this.nmInstituicao = nmInstituicao;
    return this;
  }

  withTxtObservacao(txtObservacao: string): InstituicaoBuilder {
    this.txtObservacao = txtObservacao;
    return this;
  }

  withLgAtivo(lgAtivo: number): InstituicaoBuilder {
    this.lgAtivo = lgAtivo;
    return this;
  }

  build(): Instituicao {
    if (!this.idInstituicao) {
      throw new Error('idInstituicao é obrigatório');
    }

    if (!this.nmInstituicao) {
      throw new Error('nmInstituicao é obrigatório');
    }

    return new Instituicao(
      this.idInstituicao,
      this.nmInstituicao,
      this.txtObservacao,
      this.cdInstituicao,
      this.lgAtivo
    );
  }
}