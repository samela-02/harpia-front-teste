import { BBoxQueryResponse } from "./bbox-query-response";

export class DeteccaoQueryResponse {
   cdDeteccao: number;
   cdEquipamento: number;
   cdInstituicao: number;
   idEquipamento: string;
   imgOriginal: Uint8Array;
   imgEncoding: string;
   bBoxQueryResponse: BBoxQueryResponse;
   vlConfidenceAlpr: number;
   dtDeteccao: Date;
   nmPiv: string;
   nmPlaca: string;
   vlConfidencePiv: number;
   vlLatitude: number;
   vlLongitude: number;
   lgAtivo: number;
   dtDelecao: Date;
}