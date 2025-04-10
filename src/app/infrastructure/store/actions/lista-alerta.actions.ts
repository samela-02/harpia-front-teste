import { InstituicaoFilter } from "@/domain/filters/instituicao/instituicao.filter";
import { ListaAlertaFilter } from "@/domain/filters/lista-alerta/lista-alerta.filter";

const scope = "[ListaAlerta]";
export class BuscarListaAlertaAction {
  static readonly type = `${scope} Buscar`;
  constructor(public payload?: ListaAlertaFilter) { }
}

export class SetarCdListaAlertaAction {
  static readonly type = `${scope} Setar`;
  constructor(public payload?: number) { }
}
