import { CoresVeiculosEnum } from "@/domain/enums/cores-veiculo.enum";

export class VeiculoCCOQueryResponse{
   cdVeiculo: number;
   idVeiculo: string;
   nrPlaca: string;
   nmMarca: string;
   nmModelo: string;
   corVeiculo: CoresVeiculosEnum;
   lgAtivo: number;
   dtDelecao?: Date;
}