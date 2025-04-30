import { TipoComandoEnum } from "../enums/tipo-alerta/tipo-comando.enum";

export class ComandoDTo {
   idComando: string;
   idEquipamento: string;
   tpComando: TipoComandoEnum;

   constructor(idComando: string, idEquipamento: string, tpComando: TipoComandoEnum){
    this.idComando = idComando;
    this.idEquipamento = idEquipamento;
    this.tpComando = tpComando
   }
}