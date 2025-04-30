export interface EquipmentStatus {
  idEquipamento: string;
  lastCommunicationTime: Date;
  statusColor: 'green' | 'yellow' | 'red';
  nome?: string;
}