import { TipoAlertaQueryResponse } from "./tipo-alerta-query-response";
import { VeiculoQueryResponse } from "./veiculo-query-response";

export class AlertaQueryResponse {
  cdAlerta: number
  cdListaAlerta: number;
  cdTipoAlerta: number;
  cdVeiculo: number;
  dtAlerta: Date;
  dsAlerta: string;
  tipoAlertaQueryResponse: TipoAlertaQueryResponse
  veiculoQueryResponse: VeiculoQueryResponse
}