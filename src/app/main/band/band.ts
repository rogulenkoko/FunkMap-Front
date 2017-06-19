import { InstrumentType, Musician } from "../musician/models"
import { BaseModel } from "app/core";

export class Band extends BaseModel{
    constructor(login:string, name:string){
        super(login, name);
    }

    public showPrice: number;
    public desiredInstruments: Array<InstrumentType>;
    public musicians: Array<Musician>;
    public videoLinks: Array<string>;

    public static ToBand(data: any): Band{
        var result = new Band(data.Id, data.Name);
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