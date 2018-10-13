import { InstrumentType } from "../../musician/models";


export class Marker{

    constructor(public login: string, public lat: number, public lng: number) {
        
    }
}

export class ProfileMarker extends Marker {
    constructor(login: string, lat: number, lng: number, public entityType: EntityType, public iconUrl?: string) {
        super(login, lat, lng);
        this.iconUrl = iconUrl;
    }

    //для музыкантов
    public instrument: InstrumentType;


    public static ToMarker(data: any): ProfileMarker {
        var result = new ProfileMarker(data.Login, data.Latitude, data.Longitude, data.ModelType);
        if (result.entityType == EntityType.Musician) {
            result.instrument = data.Instrument;
        }
        return result;
    }

    public static ToMarkerArray(data: any): Array<ProfileMarker> {
        var result = new Array<ProfileMarker>();
        if (data) {
            data.forEach(element => {
                result.push(ProfileMarker.ToMarker(element));
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
    Studio = 5,
    Event = 6
}