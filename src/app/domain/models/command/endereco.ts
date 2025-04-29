export class EnderecoVeiculo {
  dsLogradouro: string;
  nrEndereco: string;
  dsComplemento: string;
  nmBairro: string;
  nmCidade: string;
  nmEstado: string;

  constructor(
    dsLogradouro: string,
    nrEndereco: string,
    dsComplemento: string,
    nmBairro: string,
    nmCidade: string,
    nmEstado: string
  ) {
    this.dsLogradouro = dsLogradouro;
    this.nrEndereco = nrEndereco;
    this.dsComplemento = dsComplemento;
    this.nmBairro = nmBairro;
    this.nmCidade = nmCidade;
    this.nmEstado = nmEstado;
  }
}