import { EnderecoVeiculoQueryResponse } from "./endereco-query-response";
import { ProprietarioVeiculoQueryResponse } from "./proprietario-veiculo-query-response";

export class VeiculoDeteccaoQueryResponse {
  cdVeiculo: number;
  nrPlaca: string;
  nrRenavam: string;
  nrChassi: string;
  nmMarca: string;
  nmModelo: string;
  nmCor: string;
  nrAno: number;
  endereco: EnderecoVeiculoQueryResponse;
  proprietarios: ProprietarioVeiculoQueryResponse[]
}