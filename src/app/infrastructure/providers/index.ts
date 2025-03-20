import { clientProviders } from "./client.provider";
import { instituicaoProviders } from "./instituicao/instituicao.provider";

export const infraProviders = [
  clientProviders,
  instituicaoProviders
];
