import { InstituicaoFilter } from "@/domain/filters/instituicao/instituicao.filter";

const scope = "[Breadcrumb]";
export class SetarBreadcrumbAction {
  static readonly type = `${scope} Setar`;
  constructor(public payload?: string) { }
}
