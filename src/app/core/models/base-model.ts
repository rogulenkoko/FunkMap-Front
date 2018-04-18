

import { EntityType } from "app/main/map/models";
import { VideoInfo } from "app/tools/video-edit/video-info";

export class BaseModel {
    constructor(public login?:string, public name?:string, public entityType?: EntityType){
        
    }
    public userLogin: string;
    public videoInfos: Array<VideoInfo>;
    public latitude: number;
    public longitude: number;

    //для запроса создания профиля
    public location: Location;

    public description: string;

    public avatar: string;//байты
    public avatarId: string;//байты
    public avatarMiniId: string;
    public vkLink: string;
    public youTubeLink: string;
    public facebookLink: string;
    public soundCloudLink: string;

    public soundCloudTracks: Array<AudioInfo>;

    public address: string;

    public isActive: boolean;
}

export class Location{
    constructor(public latitude: number, public longitude: number){

    }
}

export class AudioInfo{
    constructor(public id: number, public date: Date){

    }

    static toAudioInfo(data: any): AudioInfo{
        if(!data) return null;
        var result = new AudioInfo(data.Id, data.Date);

        return result;
    }

    static toAudioInfos(data: any): Array<AudioInfo>{
        var result = new Array<AudioInfo>();
        if(!data) return result;

        data.forEach(element => {
            result.push(AudioInfo.toAudioInfo(element));
        });

        return result;
    }
}