export class GPSSSEQueryResponse {
    nmGPS: string;
    vlLatitude: number;
    vlLongitude: number;
    vlTrueCourse: number;

    constructor(nmGPS: string, vlLatitude: number, vlLongitude: number, vlTrueCourse: number) {
        this.nmGPS = nmGPS;
        this.vlLatitude = vlLatitude;
        this.vlLongitude = vlLongitude;
        this.vlTrueCourse = vlTrueCourse;
    }
}