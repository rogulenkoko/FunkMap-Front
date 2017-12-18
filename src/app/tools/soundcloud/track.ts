export class Track{

    constructor(public id: number,  public title: string, public description: string, public uri: string){

    }

    public frameUrl: string;
    public isAdded: boolean;

    static toTrack(data: any): Track{

        if(!data) return null;
        var result = new Track(data.id, data.title, data.description, data.uri);
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