import * as moment from "moment";

export class Track{

    constructor(public id: number,  public title: string, public description: string, public url: string){

    }


    public durationS: number;
    public duration: string;
    public username: string;
    public imageUrl: string;

    public saveDate: Date;

    public isAdded: boolean;
    public isPlaying: boolean;

    static toTrack(data: any): Track{
        if(!data) return null;
        var title;
        var singer;

        var splittedTitle = (<string>data.title).split("-");
        if(splittedTitle.length == 2){
            title = splittedTitle[1];
            singer = splittedTitle[0];
        } else {
            title = data.title;
            singer =  data.user.username;
        }
        var result = new Track(data.id, title, data.description, data.uri);
        result.durationS = data.duration / (1000);
        result.duration = moment(data.duration).format("mm:ss");
        result.imageUrl = data.artwork_url;
        result.username = singer;
        result.saveDate = data.created_at;
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