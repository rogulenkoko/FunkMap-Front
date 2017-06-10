import { InstrumentType, Musician } from "../musician/models"

export class Band{
    constructor(public name:string, public latitude: number, public longitude: number){

    }

    public login: string;
    public showPrice: number;
    public desiredInstruments: Array<InstrumentType>;
    public musicians: Array<Musician>;
}