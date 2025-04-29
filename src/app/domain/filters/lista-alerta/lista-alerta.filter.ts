import { PropsFilter } from "@/application/filter-creator/props.filter";
import { FilterManager, HttpFilter } from "@tivic-team/tivic-ui";
import { PaginatorType } from "@/application/filter-creator/paginator.type";
import { ListaAlertaType } from "./lista-alerta.type";

export interface ListaAlertaProps extends PropsFilter {
  idInstituicao?: string;
}

export class ListaAlertaFilter {
  props: ListaAlertaProps;

  constructor(props: ListaAlertaProps) {
    this.props = props;
  }

  getFilters(): FilterManager {
    const filterManager = new HttpFilter([]);

    filterManager.addFilter(new ListaAlertaType.idInstituicao(this.props.idInstituicao));
    filterManager.addFilter(new PaginatorType.query(this.props.query));
    filterManager.addFilter(new PaginatorType.page(this.props.page));
    filterManager.addFilter(new PaginatorType.size(this.props.size));
    filterManager.addFilter(new PaginatorType.orderBy(this.props.orderBy));

    return filterManager;
  }
}