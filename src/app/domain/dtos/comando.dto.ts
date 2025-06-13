import { TipoComandoEnum } from "../enums/tipo-alerta/tipo-comando.enum";
import { VariacaoEnum } from "../enums/variacao.enum";

export class ComandoDTo {
   idComando: string;
   idEquipamento: string;
   idComponente: String;
   variation: VariacaoEnum;

   constructor(idComando: string, idEquipamento: string, idComponente: String, variation: VariacaoEnum){
    this.idComando = idComando;
    this.idEquipamento = idEquipamento;
    this.idComponente = idComponente;
    this.variation = variation;
   }
}
