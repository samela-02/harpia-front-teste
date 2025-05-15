import { ModulosDto } from "@/application/dtos/modulos.dto";

export interface ModulosStrategy {
  definirModulos(): ModulosDto[];
}
