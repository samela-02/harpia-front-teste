import { provideStore } from "@ngxs/store";
import { InstituicaoState } from "./states/instituicao.state";
import { withNgxsReduxDevtoolsPlugin } from "@ngxs/devtools-plugin";
import { withNgxsLoggerPlugin } from "@ngxs/logger-plugin";
import { withNgxsStoragePlugin } from "@ngxs/storage-plugin";
import { UsuarioState } from "./states/usuario.state";
import { BreadcrumbState } from "./states/breadcrumb.state";
import { TipoEquipamentoState } from "./states/tipo-equipamento.state";
import { EquipamentoState } from "./states/equipamento.state";
import { TipoComponenteState } from "./states/tipo-componente.state";
import { ComponenteState } from "./states/componente.state";
import { ListaAlertaState } from "./states/lista-alerta.state";
import { TipoAlertaState } from "./states/tipo-alerta.state";

export const stateProviders = [
  provideStore(
    [
      InstituicaoState,
      TipoComponenteState,
      ListaAlertaState,
      TipoAlertaState,
      ComponenteState,
      UsuarioState,
      BreadcrumbState,
      EquipamentoState,
      TipoEquipamentoState
    ],
    withNgxsStoragePlugin({ keys: "*" }),
    withNgxsLoggerPlugin(),
    withNgxsReduxDevtoolsPlugin()
  )
]