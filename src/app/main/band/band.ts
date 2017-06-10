import { InstrumentType, Musician } from "../musician/models"

export class Band{
    constructor(public id:number, public name:string, public latitude: number, public longitude: number){

    }

    public login: string;
    public showPrice: number;
    public desiredInstruments: Array<InstrumentType>;
    public musicians: Array<Musician>;
    public videoLinks: Array<string>;

    public static ToBand(data: any): Band{
        console.log(data);
        var result = new Band(data.Id, data.Name,data.Latitude, data.Longitude);
        result.desiredInstruments = data.DesiredInstruments;
        result.showPrice = data.ShowPrice;
        result.musicians = [];
        if(data.Musicians){
            data.Musicians.forEach(musician => {
                result.musicians.push(Musician.ToMusician(musician));
            });
        }
        result.videoLinks = data.VideoLinks;
        return result;
    }
}