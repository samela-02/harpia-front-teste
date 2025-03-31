import { PropsFilter } from "@/application/filter-creator/props.filter";
import { FilterManager, HttpFilter } from "@tivic-team/tivic-ui";
import { InstituicaoType } from "./instituicao.type";
import { PaginatorType } from "@/application/filter-creator/paginator.type";

export interface InstituicaoProps extends PropsFilter {
  cdInstituicao?: number;
  idInstituicao?: string;
  nmInstituicao?: string;
  lgAtivo?: boolean
}

export class InstituicaoFilter {
  props: InstituicaoProps;

  constructor(props: InstituicaoProps) {
    this.props = props;
  }

  getFilters(): FilterManager {
    const filterManager = new HttpFilter([]);

    filterManager.addFilter(new InstituicaoType.nmInstituicao(this.props.nmInstituicao));
    filterManager.addFilter(new InstituicaoType.idInstituicao(this.props.idInstituicao));
    filterManager.addFilter(new InstituicaoType.cdInstituicao(this.props.cdInstituicao));
    filterManager.addFilter(new InstituicaoType.lgAtivo(this.props.lgAtivo));
    filterManager.addFilter(new PaginatorType.query(this.props.query));
    filterManager.addFilter(new PaginatorType.page(this.props.page));
    filterManager.addFilter(new PaginatorType.size(this.props.size));
    filterManager.addFilter(new PaginatorType.orderBy(this.props.orderBy));

    return filterManager;
  }
}