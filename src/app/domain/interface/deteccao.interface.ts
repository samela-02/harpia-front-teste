import { Equipamento } from "./equipamento.interface";

export interface Deteccao {
  equipamento: Equipamento;
  dtEvento: string;
  idSource: string;
  imgOriginal: string;
  imgPlaca: string;
  nmPiv: string;
  nrPlaca: string;
  VlLatitude: number;
  VlLongitude: number;
}