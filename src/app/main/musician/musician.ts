

export class Musician{
    constructor(public id:number, public name: string){

    }

    public styles: Array<MusicStyle>;
    public description: string;
    public videoYoutube: string;
}

export enum MusicStyle{
    HipHop = 1,
    Rock = 2,
    Funk = 3
}