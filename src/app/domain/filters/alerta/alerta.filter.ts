import { PropsFilter } from "@/application/filter-creator/props.filter";
import { FilterManager, HttpFilter } from "@tivic-team/tivic-ui";
import { PaginatorType } from "@/application/filter-creator/paginator.type";
import { AlertaType } from "./alerta.type";

export interface AlertaProps extends PropsFilter {
  cdListaAlerta?: number;
  nrPlaca?: string
}

export class AlertaFilter {
  props: AlertaProps;

  constructor(props: AlertaProps) {
    this.props = props;
  }

  getFilters(): FilterManager {
    const filterManager = new HttpFilter([]);

    filterManager.addFilter(new AlertaType.cdListaAlerta(this.props.cdListaAlerta));
    filterManager.addFilter(new AlertaType.nrPlaca(this.props.nrPlaca));
    filterManager.addFilter(new PaginatorType.query(this.props.query));
    filterManager.addFilter(new PaginatorType.page(this.props.page));
    filterManager.addFilter(new PaginatorType.size(this.props.size));
    filterManager.addFilter(new PaginatorType.orderBy(this.props.orderBy));

    return filterManager;
  }
}