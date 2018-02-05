import * as moment from "moment";

export class Track{

    constructor(public id: number,  public title: string, public description: string, public uri: string){

    }


    public durationS: number;
    public duration: string;
    public username: string;

    public isAdded: boolean;
    public isPlaying: boolean;

    static toTrack(data: any): Track{
        if(!data) return null;
        var result = new Track(data.id, data.title, data.description, data.uri);
        result.durationS = data.duration / (1000);
        result.duration = moment(data.duration).format("mm:ss");

        result.username = data.user.username;
        return result;
    }

    static toTracks(data: any): Array<Track>{
        
        var result = new Array<Track>();
        if(!data) return result;

        data.forEach(element => {
            result.push(Track.toTrack(element));
        });

        return result;
        
    }
}