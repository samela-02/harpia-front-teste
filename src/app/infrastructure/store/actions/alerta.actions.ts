import { AlertaFilter } from "@/domain/filters/alerta/alerta.filter";

const scope = "[Alerta]";
const scopeCar= "[Veiculo]"
export class BuscarAlertaAction {
  static readonly type = `${scope} Buscar`;
  constructor(public payload?: AlertaFilter) { }
}

export class BuscarVeiculoPorPlacaAction {
  static readonly type = `${scopeCar} BuscarVeiculo`;
  constructor(public payload?: string) { }
}
