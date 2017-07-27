import { BaseModel } from "app/core";

export class Musician extends BaseModel{

    constructor(login?:string, name?:string){
        super(login, name);
        this.sex = Sex.Male;
        this.styles = [];
    }
   

    public styles: Array<MusicStyle>;
   
    
    public sex: Sex;
    public birthDate: Date;
    public age: number;
    public years: number;
    public expirience: ExpirienceType;
    public instrument: InstrumentType;

    public static ToMusician(data: any): Musician{
        console.log(data);
        var result = new Musician(data.Login, data.Name);
        result.birthDate = new Date(data.BirthDate);
        result.description = data.Description;
        result.expirience = data.Expirience;
        result.sex = data.Sex;
        result.styles = data.Styles;
        result.avatar = data.Avatar;
        result.years = data.Age;
        result.vkLink = data.VkLink;
        result.youTubeLink = data.YouTubeLink;
        result.facebookLink = data.FacebookLink;
        result.instrument = data.Instrument;
        result.age = data.Age;
        result.latitude = data.Latitude;
        result.longitude = data.Longitude;
        return result;
    }
}

export enum MusicStyle{
    HipHop = 1,
    Rock = 2,
    Funk = 3
}

export enum Sex{
    Male = 1,
    Female = 2
}

export enum InstrumentType{
    Bass = 1,
    Drums = 2,
    Vocal = 3,
    Brass = 4,
    Guitar = 5,
    Keyboard = 6
}

export enum ExpirienceType{
    None = 0,
    Begginer = 1,
    Middle = 2,
    Advanced = 3,
    SuperStar = 4
}