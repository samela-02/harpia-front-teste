import { clientProviders } from "./client.provider";
import { instituicaoProviders } from "./instituicao/instituicao.provider";
import { loginProviders } from "./login/login.provider";
import { usuarioProviders } from "./usuario/usuario.provider";

export const infraProviders = [
  clientProviders,
  instituicaoProviders,
  usuarioProviders,
  loginProviders
];
