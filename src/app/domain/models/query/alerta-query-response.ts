import { TipoAlertaQueryResponse } from "./tipo-alerta-query-response";
import { VeiculoDeteccaoQueryResponse } from "./veiculo-deteccao-query-response";

export class AlertaQueryResponse {
  cdAlerta: number
  cdListaAlerta: number;
  cdTipoAlerta: number;
  cdVeiculo: number;
  dtAlerta: Date;
  dsAlerta: string;
  tipoAlertaQueryResponse: TipoAlertaQueryResponse
  veiculoQueryResponse: VeiculoDeteccaoQueryResponse
}