import { PropsFilter } from "@/application/filter-creator/props.filter";
import { FilterManager, HttpFilter } from "@tivic-team/tivic-ui";
import { PaginatorType } from "@/application/filter-creator/paginator.type";
import { EquipamentoType } from "./equipamento.type";

export interface EquipamentosProps extends PropsFilter {
  cdEquipamento?: number;
  cdInstituicao?: number;
  cdTipoEquipamento?: number;
  dtAlocacaoInferior?: Date;
  dtAlocacaoSuperior?: Date;
  idEquipamento?: string;
  nmEquipamento?: string;
  nrSerie?: string;
  lgAtivo?: number;
  dtDelecaoInferior?: Date;
  dtDelecaoSuperior?: Date;
}

export class EquipamentosFilter {
  props: EquipamentosProps;

  constructor(props: EquipamentosProps) {
    this.props = props;
  }

  getFilters(): FilterManager {
    const filterManager = new HttpFilter([]);

    filterManager.addFilter(new EquipamentoType.nmEquipamento(this.props.nmEquipamento));
    filterManager.addFilter(new EquipamentoType.cdEquipamento(this.props.cdEquipamento));
    filterManager.addFilter(new EquipamentoType.cdInstituicao(this.props.cdInstituicao));
    filterManager.addFilter(new EquipamentoType.idEquipamento(this.props.idEquipamento));
    filterManager.addFilter(new EquipamentoType.lgAtivo(this.props.lgAtivo));
    filterManager.addFilter(new EquipamentoType.dtDelecaoInferior(this.props.dtDelecaoInferior));
    filterManager.addFilter(new EquipamentoType.dtDelecaoSuperior(this.props.dtDelecaoSuperior));
    filterManager.addFilter(new EquipamentoType.dtAlocacaoInferior(this.props.dtAlocacaoInferior));
    filterManager.addFilter(new EquipamentoType.dtAlocacaoSuperior(this.props.dtAlocacaoSuperior));
    filterManager.addFilter(new EquipamentoType.cdTipoEquipamento(this.props.cdTipoEquipamento));
    filterManager.addFilter(new EquipamentoType.nrSerie(this.props.nrSerie));
    filterManager.addFilter(new PaginatorType.query(this.props.query));
    filterManager.addFilter(new PaginatorType.page(this.props.page));
    filterManager.addFilter(new PaginatorType.size(this.props.size));
    filterManager.addFilter(new PaginatorType.orderBy(this.props.orderBy));

    return filterManager;
  }
}
