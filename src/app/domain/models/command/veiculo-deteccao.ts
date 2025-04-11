import { EnderecoVeiculo } from "./endereco";
import { ProprietarioVeiculo } from "./proprietario-veiculo";

export class Veiculo {
  cdVeiculo: number;
  nrPlaca: string;
  nrRenavam: string;
  nrChassi: string;
  nmMarca: string;
  nmModelo: string;
  nmCor: string;
  nrAno: number;
  endereco: EnderecoVeiculo;
  proprietarios: ProprietarioVeiculo[]
}