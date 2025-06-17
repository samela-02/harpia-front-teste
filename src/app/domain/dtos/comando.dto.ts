import { VariacaoEnum } from "../enums/variacao.enum";

export class ComandoDTo {
   idComando: string;
   idEquipamento: string;
   idComponente: String;
   tpVariacao: VariacaoEnum;

   constructor(idComando: string, idEquipamento: string, idComponente: String, tpVariacao: VariacaoEnum){
    this.idComando = idComando;
    this.idEquipamento = idEquipamento;
    this.idComponente = idComponente;
    this.tpVariacao = tpVariacao;
   }
}
