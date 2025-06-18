import { colorStatus } from "../enums/color-status.enum";

export interface EquipmentStatus {
  idEquipamento: string;
  dtUltimaComunicacao: Date;
  statusColor: colorStatus
  nome?: string;
}
