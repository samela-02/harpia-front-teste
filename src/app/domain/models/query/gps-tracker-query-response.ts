import { GPSSSEQueryResponse } from "./gps-sse-query-response";

export class GpsTrackerQueryResponse {
    idInstituicao: string;
    idEquipamento: string;
    sensores: GPSSSEQueryResponse[];

  constructor(idInstituicao: string, idEquipamento: string, sensores: GPSSSEQueryResponse[]) {
        this.idInstituicao = idInstituicao;
        this.idEquipamento = idEquipamento;
        this.sensores = sensores;
    }
}