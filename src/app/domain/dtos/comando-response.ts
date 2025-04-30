import { TipoComandoEnum } from "../enums/tipo-alerta/tipo-comando.enum";

export class ComandoResponse {
   idComando: string;
   tipoComando: TipoComandoEnum;
   idEquipamento: string;
   cntComando: any;
}