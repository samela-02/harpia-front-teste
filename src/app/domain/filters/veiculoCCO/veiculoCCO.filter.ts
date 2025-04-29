import { PropsFilter } from "@/application/filter-creator/props.filter";
import { FilterManager, HttpFilter } from "@tivic-team/tivic-ui";
import { PaginatorType } from "@/application/filter-creator/paginator.type";
import { VeiculoCCOType } from "./veiculoCCO.type";

export interface VeiculoCCOProps extends PropsFilter {
  cdVeiculo?: number;
  nrPlaca?: string;
  nmMarca?: string;
  nmModelo?: string;
  corVeiculo?: string;
  lgAtivo?: number;
  dtDelecaoInferior?: Date;
  dtDelecaoSuperior?: Date;
}

export class VeiculoCCOFilter {
  props: VeiculoCCOProps;

  constructor(props: VeiculoCCOProps) {
    this.props = props;
  }

  getFilters(): FilterManager {
    const filterManager = new HttpFilter([]);

    filterManager.addFilter(new VeiculoCCOType.cdVeiculo(this.props.cdVeiculo));
    filterManager.addFilter(new VeiculoCCOType.nrPlaca(this.props.nrPlaca));
    filterManager.addFilter(new VeiculoCCOType.nmMarca(this.props.nmMarca));
    filterManager.addFilter(new VeiculoCCOType.nmModelo(this.props.nmModelo));
    filterManager.addFilter(new VeiculoCCOType.corVeiculo(this.props.corVeiculo));
    filterManager.addFilter(new VeiculoCCOType.lgAtivo(this.props.lgAtivo));
    filterManager.addFilter(new VeiculoCCOType.dtDelecaoInferior(this.props.dtDelecaoInferior));
    filterManager.addFilter(new VeiculoCCOType.dtDelecaoSuperior(this.props.dtDelecaoSuperior));
    filterManager.addFilter(new PaginatorType.query(this.props.query));
    filterManager.addFilter(new PaginatorType.page(this.props.page));
    filterManager.addFilter(new PaginatorType.size(this.props.size));
    filterManager.addFilter(new PaginatorType.orderBy(this.props.orderBy));

    return filterManager;
  }
}