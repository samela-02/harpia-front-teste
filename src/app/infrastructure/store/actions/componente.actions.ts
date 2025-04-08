import { ComponentesFilter } from "@/domain/filters/componente/componente.filter";

const scope = "[Componente]";
export class BuscarComponentesAction {
  static readonly type = `${scope} Buscar`;
  constructor(public payload?: ComponentesFilter) { }
}
