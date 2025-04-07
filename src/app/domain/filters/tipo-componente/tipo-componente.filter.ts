import { PropsFilter } from "@/application/filter-creator/props.filter";
import { FilterManager, HttpFilter } from "@tivic-team/tivic-ui";
import { PaginatorType } from "@/application/filter-creator/paginator.type";
import { TipoComponenteType } from "./tipo-componente.type";

export interface TiposComponentesProps extends PropsFilter {
  cdTipoComponente?: number;
  idTipoComponente?: string;
  nmTipoComponente?: string;
  lgAtivo?: boolean;
  dtDelecaoInferior?: Date;
  dtDelecaoSuperior?: Date;
}

export class TiposComponentesFilter {
  props: TiposComponentesProps;

  constructor(props: TiposComponentesProps) {
    this.props = props;
  }

  getFilters(): FilterManager {
    const filterManager = new HttpFilter([]);

    filterManager.addFilter(new TipoComponenteType.nmTipoComponente(this.props.nmTipoComponente));
    filterManager.addFilter(new TipoComponenteType.cdTipoComponente(this.props.cdTipoComponente));
    filterManager.addFilter(new TipoComponenteType.lgAtivo(this.props.lgAtivo));
    filterManager.addFilter(new TipoComponenteType.dtDelecaoInferior(this.props.dtDelecaoInferior));
    filterManager.addFilter(new TipoComponenteType.dtDelecaoSuperior(this.props.dtDelecaoSuperior));
    filterManager.addFilter(new PaginatorType.query(this.props.query));
    filterManager.addFilter(new PaginatorType.page(this.props.page));
    filterManager.addFilter(new PaginatorType.size(this.props.size));
    filterManager.addFilter(new PaginatorType.orderBy(this.props.orderBy));

    return filterManager;
  }
}