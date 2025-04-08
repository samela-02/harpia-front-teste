import { clientProviders } from "./client.provider";
import { compoenenteProviders } from "./componente/componente.provider";
import { equipamentoProviders } from "./equipamento/equipamento.provider";
import { instituicaoProviders } from "./instituicao/instituicao.provider";
import { loginProviders } from "./login/login.provider";
import { tipoComponenteProviders } from "./tipo-componente/tipo-component.provider";
import { tipoEquipamentoProviders } from "./tipo-equipamento/tipo-equipamento.provider";
import { usuarioProviders } from "./usuario/usuario.provider";

export const providers = [
  clientProviders,
  instituicaoProviders,
  tipoComponenteProviders,
  tipoEquipamentoProviders,
  equipamentoProviders,
  compoenenteProviders,
  usuarioProviders,
  loginProviders
];
