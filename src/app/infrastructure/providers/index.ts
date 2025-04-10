import { alertaProviders } from "./alerta/alerta.provider";
import { clientProviders } from "./client.provider";
import { compoenenteProviders } from "./componente/componente.provider";
import { equipamentoProviders } from "./equipamento/equipamento.provider";
import { instituicaoProviders } from "./instituicao/instituicao.provider";
import { listaAlertaProviders } from "./lista-alerta/lista-alerta.provider";
import { loginProviders } from "./login/login.provider";
import { tipoAlertaProviders } from "./tipo-alerta/tipo-alerta.provider";
import { tipoComponenteProviders } from "./tipo-componente/tipo-component.provider";
import { tipoEquipamentoProviders } from "./tipo-equipamento/tipo-equipamento.provider";
import { usuarioProviders } from "./usuario/usuario.provider";

export const providers = [
  clientProviders,
  instituicaoProviders,
  tipoComponenteProviders,
  listaAlertaProviders,
  tipoEquipamentoProviders,
  tipoAlertaProviders,
  alertaProviders,
  equipamentoProviders,
  compoenenteProviders,
  usuarioProviders,
  loginProviders
];
