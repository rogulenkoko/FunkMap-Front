import { InstrumentType } from "../../musician/models";

export class Marker {
    constructor(public login: string, public lat: number, public lng: number, public entityType: EntityType, public iconUrl?: string) {
        this.iconUrl = iconUrl;
    }

    //для музыкантов
    public instrument: InstrumentType;


    public static ToMarker(data: any): Marker {
        var result = new Marker(data.Login, data.Latitude, data.Longitude, data.ModelType);
        if (result.entityType == EntityType.Musician) {
            result.instrument = data.Instrument;
        }
        return result;
    }

    public static ToMarkerArray(data: any): Array<Marker> {
        var result = new Array<Marker>();
        if (data) {
            data.forEach(element => {
                result.push(Marker.ToMarker(element));
            });
        }
        return result;
    }
}

export enum EntityType {
    Musician = 1,
    Shop = 2,
    Band = 3,
    RehearsalPoint = 4,
    Studio = 5
}