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
import { AlertaState } from "./states/alerta.state";
import { CidadeState } from "./states/cidade.state";

export const stateProviders = [
  provideStore(
    [
      InstituicaoState,
      TipoComponenteState,
      ListaAlertaState,
      TipoAlertaState,
      AlertaState,
      ComponenteState,
      UsuarioState,
      BreadcrumbState,
      EquipamentoState,
      TipoEquipamentoState,
      CidadeState
    ],
    withNgxsStoragePlugin({ keys: "*" }),
    withNgxsLoggerPlugin(),
    withNgxsReduxDevtoolsPlugin()
  )
]