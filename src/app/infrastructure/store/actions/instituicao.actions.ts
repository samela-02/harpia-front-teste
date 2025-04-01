import { InstituicaoFilter } from "@/domain/filters/instituicao/instituicao.filter";

const scope = "[Instituicao]";
export class BuscarInstituicoesAction {
  static readonly type = `${scope} Buscar`;
  constructor(public payload?: InstituicaoFilter) { }
}
