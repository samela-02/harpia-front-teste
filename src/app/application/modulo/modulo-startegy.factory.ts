import { ModulosDto } from "../dtos/modulos.dto";
import { ModulosStrategy } from "./modulos.strategy";

export class ModulosStrategyFactory {
  constructor(private modulosStrategy: ModulosStrategy){
    this.setModulos
  }

  private setModulos(modulosStrategy: ModulosStrategy){
    this.modulosStrategy = modulosStrategy
  }

  getModulos(): ModulosDto[] {
    return this.modulosStrategy.definirModulos()
  }
}
