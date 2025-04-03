import { PropsFilter } from "@/application/filter-creator/props.filter";
import { FilterManager, HttpFilter } from "@tivic-team/tivic-ui";
import { PaginatorType } from "@/application/filter-creator/paginator.type";
import { TipoEquipamentoType } from "./tipo-equipamento.type";

export interface TipoEquipamentosProps extends PropsFilter {
  cdTipoEquipamento?: number;
  idTipoEquipamento?: string;
  nmTipoEquipamento?: string;
  lgAtivo?: boolean;
  dtDelecao?: Date;
}

export class TipoEquipamentosFilter {
  props: TipoEquipamentosProps;

  constructor(props: TipoEquipamentosProps) {
    this.props = props;
  }

  getFilters(): FilterManager {
    const filterManager = new HttpFilter([]);

    filterManager.addFilter(new TipoEquipamentoType.nmTipoEquipamento(this.props.nmTipoEquipamento));
    filterManager.addFilter(new TipoEquipamentoType.cdTipoEquipamento(this.props.cdTipoEquipamento));
    filterManager.addFilter(new TipoEquipamentoType.lgAtivo(this.props.lgAtivo));
    filterManager.addFilter(new TipoEquipamentoType.dtDelecao(this.props.dtDelecao));
    filterManager.addFilter(new PaginatorType.query(this.props.query));
    filterManager.addFilter(new PaginatorType.page(this.props.page));
    filterManager.addFilter(new PaginatorType.size(this.props.size));
    filterManager.addFilter(new PaginatorType.orderBy(this.props.orderBy));

    return filterManager;
  }
}