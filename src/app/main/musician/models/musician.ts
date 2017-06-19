import { BaseModel } from "app/core";

export class Musician extends BaseModel{

    constructor(login:string, name:string){
        super(login, name);
        this.sex = Sex.Male;
        this.styles = [];
    }
   

    public styles: Array<MusicStyle>;
   
    public videoYoutube: string;
    public sex: Sex;
    public birthDate: Date;
    public years: number;
    public expirience: number;
    public instrument: InstrumentType;

    public static ToMusician(data: any): Musician{
        var result = new Musician(data.Id, data.Name);
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