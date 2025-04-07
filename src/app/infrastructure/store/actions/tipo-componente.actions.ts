import { TiposComponentesFilter } from "@/domain/filters/tipo-componente/tipo-componente.filter";

const scope = "[TipoComponente]";
export class BuscarTiposComponentesAction {
  static readonly type = `${scope} Buscar`;
  constructor(public payload?: TiposComponentesFilter) { }
}
