import { TipoAlertaCompletoQueryResponse } from "./tipo-alerta-completo-query-response";
import { VeiculoDeteccaoCompletoQueryResponse } from "./veiculo-deteccao-completo-query-response";

export class AlertaCompletoQueryResponse {
  cdAlerta: number
  cdListaAlerta: number;
  cdVeiculo: number;
  dtAlerta: Date;
  dsAlerta: string;
  dtCriacao: Date;
  dtAtualizacao: Date;
  tipoAlerta: TipoAlertaCompletoQueryResponse
  veiculo: VeiculoDeteccaoCompletoQueryResponse
}