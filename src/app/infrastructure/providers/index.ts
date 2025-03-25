import { clientProviders } from "./client.provider";
import { instituicaoProviders } from "./instituicao/instituicao.provider";
import { loginProviders } from "./login/login.provider";

export const infraProviders = [
  clientProviders,
  instituicaoProviders,
  loginProviders
];
