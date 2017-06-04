import { InstrumentType } from "../../musician/models";

export class Marker {
    constructor(public id: number, public lat: number, public lng: number, public entityType: EntityType, public iconUrl?: string) {

    }

    //для музыкантов
    public instrument: InstrumentType;


    public static ToMarker(data: any):Marker{
        var result = new Marker(data.Id, data.Latitude, data.Longitude, data.ModelType);
        if(result.entityType = EntityType.Musician){
            result.instrument = data.Instrument;
        }
        return result;
    }

    public static ToMarkerArray(data: any):Array<Marker>{
        var result = new Array<Marker>();
        if(data){
            data.forEach(element => {
                result.push(Marker.ToMarker(element));
            });
        }
        return result;
    }
}

export enum EntityType {
    Musician = 1,
    Shop = 2
}