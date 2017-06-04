export class Musician{
    constructor(public id:number, public name: string){

    }

    public styles: Array<MusicStyle>;
    public description: string;
    public videoYoutube: string;
    public sex: Sex;
    public birthDate: string;
    public years: number;
    public expirience: number;
    public instrument: InstrumentType;

    public avatar: string;
    public vkLink: string;
    public youTubeLink: string;
    public facebookLink: string;


    public static ToMusician(data: any): Musician{
        var result = new Musician(data.Id, data.Name);
        result.birthDate = new Date(data.BirthDate).toLocaleDateString();
        result.description = data.Description;
        result.expirience = data.Expirience;
        result.sex = data.Sex;
        result.styles = data.Styles;
        result.avatar = data.AvatarImage;
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
    Funk = 4
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