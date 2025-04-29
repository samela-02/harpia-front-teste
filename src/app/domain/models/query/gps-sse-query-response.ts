export class GPSSSEQueryResponse {
    nmGPS: string;
    vlLatitude: number;
    vlLongitude: number;
    vlTrueCourse: number;
    dtEvento: Date

    constructor(nmGPS: string, vlLatitude: number, vlLongitude: number, vlTrueCourse: number, dtEvento: Date) {
        this.nmGPS = nmGPS;
        this.vlLatitude = vlLatitude;
        this.vlLongitude = vlLongitude;
        this.vlTrueCourse = vlTrueCourse;
        this.dtEvento = dtEvento
    }
}