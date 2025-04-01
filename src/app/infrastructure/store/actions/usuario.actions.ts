import { UsuarioFilter } from "@/domain/filters/usuario/usuario.filter";

const scope = "[Usuario]";
export class BuscarUsuariosAction {
  static readonly type = `${scope} Buscar`;
  constructor(public payload?: UsuarioFilter) { }
}
