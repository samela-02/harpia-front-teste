import { PropsFilter } from "@/application/filter-creator/props.filter";
import { FilterManager, HttpFilter } from "@tivic-team/tivic-ui";
import { PaginatorType } from "@/application/filter-creator/paginator.type";
import { UsuarioRole } from "@/domain/enums/usuario-role.enum";
import { UsuarioType } from "./usuario.type";

export interface UsuarioProps extends PropsFilter {
  cdUsuario?: number;
  cdInstituicao?: number;
  role?: UsuarioRole;
  nmUsuario?: string;
  lgAtivo?: boolean;
}

export class UsuarioFilter {
  props: UsuarioProps;

  constructor(props: UsuarioProps) {
    this.props = props;
  }

  getFilters(): FilterManager {
    const filterManager = new HttpFilter([]);

    filterManager.addFilter(new UsuarioType.cdInstituicao(this.props.cdInstituicao));
    filterManager.addFilter(new UsuarioType.cdUsuario(this.props.cdUsuario));
    filterManager.addFilter(new UsuarioType.nmUsuario(this.props.nmUsuario));
    filterManager.addFilter(new UsuarioType.role(this.props.role));
    filterManager.addFilter(new UsuarioType.lgAtivo(this.props.lgAtivo));
    filterManager.addFilter(new PaginatorType.query(this.props.query));
    filterManager.addFilter(new PaginatorType.page(this.props.page));
    filterManager.addFilter(new PaginatorType.size(this.props.size));
    filterManager.addFilter(new PaginatorType.orderBy(this.props.orderBy));

    return filterManager;
  }
}