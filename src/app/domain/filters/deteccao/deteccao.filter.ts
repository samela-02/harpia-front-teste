import { PropsFilter } from "@/application/filter-creator/props.filter";
import { FilterManager, HttpFilter } from "@tivic-team/tivic-ui";
import { PaginatorType } from "@/application/filter-creator/paginator.type";
import { DeteccaoType } from "./deteccao.type";

export interface DeteccaoProps extends PropsFilter {
  cdDeteccao?: number;
  cdEquipamento?: number;
  vlConfidenceAlprInferior?: number;
  vlConfidenceAlprSuperior?: number;
  dtDeteccaoInferior?: Date;
  dtDeteccaoSuperior?: Date;
  nmPiv?: string;
  nrPlaca?: string;
  vlConfidencePivInferior?: number;
  vlConfidencePivSuperior?: number;
  lgAtivo?: number;
  cdInstituicao?: number;
}

export class DeteccaoFilter {
  props: DeteccaoProps;

  constructor(props: DeteccaoProps) {
    this.props = props;
  }

  getFilters(): FilterManager {
    const filterManager = new HttpFilter([]);

    filterManager.addFilter(new DeteccaoType.cdDeteccao(this.props.cdDeteccao));
    filterManager.addFilter(new DeteccaoType.cdEquipamento(this.props.cdEquipamento));
    filterManager.addFilter(new DeteccaoType.vlConfidenceAlprInferior(this.props.vlConfidenceAlprInferior));
    filterManager.addFilter(new DeteccaoType.vlConfidenceAlprSuperior(this.props.vlConfidenceAlprSuperior));
    filterManager.addFilter(new DeteccaoType.dtDeteccaoInferior(this.props.dtDeteccaoInferior));
    filterManager.addFilter(new DeteccaoType.dtDeteccaoSuperior(this.props.dtDeteccaoSuperior));
    filterManager.addFilter(new DeteccaoType.nmPiv(this.props.nmPiv));
    filterManager.addFilter(new DeteccaoType.nrPlaca(this.props.nrPlaca));
    filterManager.addFilter(new DeteccaoType.vlConfidencePivInferior(this.props.vlConfidencePivInferior));
    filterManager.addFilter(new DeteccaoType.vlConfidencePivSuperior(this.props.vlConfidencePivSuperior));
    filterManager.addFilter(new DeteccaoType.lgAtivo(this.props.lgAtivo));
    filterManager.addFilter(new DeteccaoType.cdInstituicao(this.props.cdInstituicao));
    filterManager.addFilter(new PaginatorType.query(this.props.query));
    filterManager.addFilter(new PaginatorType.page(this.props.page));
    filterManager.addFilter(new PaginatorType.size(this.props.size));
    filterManager.addFilter(new PaginatorType.orderBy(this.props.orderBy));

    return filterManager;
  }
}
