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