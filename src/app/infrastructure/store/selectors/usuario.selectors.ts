import { Selector } from "@ngxs/store";
import { InstituicaoState, InstituicaoStateModel } from "../states/instituicao.state";
import { UsuarioState, UsuarioStateModel } from "../states/usuario.state";

export class UsuarioSelectors {
  @Selector([UsuarioState])
  static usuario(state: UsuarioStateModel) {
    return state.usuarios
  }
}