import { EnderecoVeiculo } from "./endereco";
import { ProprietarioVeiculo } from "./proprietario-veiculo";

export class Veiculo {
  cdVeiculo?: number;
  nrPlaca: string;
  nmModelo?: string;
  nmCor?: string;
  nmMarca?: string;
  nrAno?: number;
  nrChassi?: string;
  nrRenavam?: string;
  endereco?: EnderecoVeiculo;
  proprietarios?: ProprietarioVeiculo[]
}