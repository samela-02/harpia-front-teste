import { provideStore } from "@ngxs/store";
import { InstituicaoState } from "./states/instituicao.state";
import { withNgxsReduxDevtoolsPlugin } from "@ngxs/devtools-plugin";
import { withNgxsLoggerPlugin } from "@ngxs/logger-plugin";
import { withNgxsStoragePlugin } from "@ngxs/storage-plugin";

export const stateProviders = [
  provideStore(
    [
      InstituicaoState
    ],
    withNgxsStoragePlugin({ keys: "*" }),
    withNgxsLoggerPlugin(),
    withNgxsReduxDevtoolsPlugin()
  )
]