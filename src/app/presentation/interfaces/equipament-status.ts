export interface EquipmentStatus {
  idEquipamento: string;
  dtUltimaComunicacao: Date;
  statusColor: 'green' | 'yellow' | 'red' | 'gray';
  nome?: string;
}
