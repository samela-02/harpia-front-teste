export interface EquipmentStatus {
  idEquipamento: string;
  lastCommunicationTimeGps: Date;
  lastCommunicationTimeBd: Date
  statusColor: 'green' | 'yellow' | 'red';
  nome?: string;
}