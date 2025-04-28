
export class VeiculoCCO{
   cdVeiculo?: number | null;
   idVeiculo: string;
   nrPlaca: string;
   nmMarca: string;
   nmModelo: string;
   corVeiculo: string;

   constructor(
     idVeiculo: string,
     nrPlaca: string,
     nmMarca: string,
     nmModelo: string,
     corVeiculo: string
   ) {
     this.idVeiculo = idVeiculo;
     this.nrPlaca = nrPlaca;
     this.nmMarca = nmMarca;
     this.nmModelo = nmModelo;
     this.corVeiculo = corVeiculo;
   }
}