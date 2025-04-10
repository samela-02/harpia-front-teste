import { AlertaFilter } from "@/domain/filters/alerta/alerta.filter";

const scope = "[Alerta]";
export class BuscarAlertaAction {
  static readonly type = `${scope} Buscar`;
  constructor(public payload?: AlertaFilter) { }
}
