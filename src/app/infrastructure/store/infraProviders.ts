import { providers } from "../providers";
import { stateProviders } from "./state.providers";

export const infraProviders = [
  stateProviders,
  providers
]