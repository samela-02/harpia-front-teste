import { PropsFilter } from "@/application/filter-creator/props.filter";
import { FilterManager, HttpFilter } from "@tivic-team/tivic-ui";
import { PaginatorType } from "@/application/filter-creator/paginator.type";
import { TipoAlertaType } from "./tipo-alerta.type";

export interface TipoAlertaProps extends PropsFilter {
  cdListaAlerta?: number;
}

export class TipoAlertaFilter {
  props: TipoAlertaProps;

  constructor(props: TipoAlertaProps) {
    this.props = props;
  }

  getFilters(): FilterManager {
    const filterManager = new HttpFilter([]);

    filterManager.addFilter(new TipoAlertaType.cdListaAlerta(this.props.cdListaAlerta));
    filterManager.addFilter(new PaginatorType.query(this.props.query));
    filterManager.addFilter(new PaginatorType.page(this.props.page));
    filterManager.addFilter(new PaginatorType.size(this.props.size));
    filterManager.addFilter(new PaginatorType.orderBy(this.props.orderBy));

    return filterManager;
  }
}