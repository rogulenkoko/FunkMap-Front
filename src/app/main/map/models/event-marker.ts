import { Marker } from "./marker";

export class EventMarker extends Marker{
    constructor(id: string, lat: number, lng: number) {
        super(id, lat, lng);
    }

    public qwe: string;


    public static ToMarker(data: any): EventMarker {
        var result = new EventMarker(data.Login, data.Latitude, data.Longitude);
        return result;
    }

    public static ToMarkerArray(data: any): Array<EventMarker> {
        var result = new Array<EventMarker>();
        if (data) {
            data.forEach(element => {
                result.push(EventMarker.ToMarker(element));
            });
        }
        return result;
    }
}