import { GPSSSEQueryResponse } from "./gps-sse-query-response";

export class GpsTrackerQueryResponse {
    idInstituicao: string;
    idEquipamento: string;
    gps: GPSSSEQueryResponse[];

  constructor(idInstituicao: string, idEquipamento: string, gps: GPSSSEQueryResponse[]) {
        this.idInstituicao = idInstituicao;
        this.idEquipamento = idEquipamento;
        this.gps = gps;
    }
}