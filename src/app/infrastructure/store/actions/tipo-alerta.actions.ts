import { TipoAlertaFilter } from "@/domain/filters/tipo-alerta/tipo-alerta.filter";

const scope = "[TipoAlerta]";
export class BuscarTiposAlertasAction {
  static readonly type = `${scope} Buscar`;
  constructor(public payload?: TipoAlertaFilter) { }
}

export class LimparTiposAlertasAction {
  static readonly type = `${scope} Limpar`;
}
