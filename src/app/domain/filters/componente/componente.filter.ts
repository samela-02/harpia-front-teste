import { PropsFilter } from "@/application/filter-creator/props.filter";
import { FilterManager, HttpFilter } from "@tivic-team/tivic-ui";
import { PaginatorType } from "@/application/filter-creator/paginator.type";
import { ComponenteType } from "./componente.type";

export interface ComponentesProps extends PropsFilter {
  cdComponente?: number;
  cdTipoComponente?: number;
  idComponente?: string;
  cdEquipamento?: number;
  idEquipamento?: string;
  nmComponente?: string;
  lgAtivo?: boolean;
  dtDelecaoInferior?: Date;
  dtDelecaoSuperior?: Date;
}

export class ComponentesFilter {
  props: ComponentesProps;

  constructor(props: ComponentesProps) {
    this.props = props;
  }

  getFilters(): FilterManager {
    const filterManager = new HttpFilter([]);

    filterManager.addFilter(new ComponenteType.cdComponente(this.props.cdComponente));
    filterManager.addFilter(new ComponenteType.cdTipoComponente(this.props.cdTipoComponente));
    filterManager.addFilter(new ComponenteType.idComponente(this.props.idComponente));
    filterManager.addFilter(new ComponenteType.cdEquipamento(this.props.cdEquipamento));
    filterManager.addFilter(new ComponenteType.idEquipamento(this.props.idEquipamento));
    filterManager.addFilter(new ComponenteType.nmComponente(this.props.nmComponente));
    filterManager.addFilter(new ComponenteType.lgAtivo(this.props.lgAtivo));
    filterManager.addFilter(new ComponenteType.dtDelecaoInferior(this.props.dtDelecaoInferior));
    filterManager.addFilter(new ComponenteType.dtDelecaoSuperior(this.props.dtDelecaoSuperior));
    filterManager.addFilter(new PaginatorType.query(this.props.query));
    filterManager.addFilter(new PaginatorType.page(this.props.page));
    filterManager.addFilter(new PaginatorType.size(this.props.size));
    filterManager.addFilter(new PaginatorType.orderBy(this.props.orderBy));

    return filterManager;
  }
}
