

import { EntityType } from "app/main/map/models";
import { VideoInfo } from "app/tools/video-edit/video-info";

export class BaseModel {
    constructor(public login?:string, public name?:string, public entityType?: EntityType){
        
    }
    public userLogin: string;
    public videoInfos: Array<VideoInfo>;
    public latitude: number;
    public longitude: number;

    public description: string;

    public avatar: string;//байты
    public avatarId: string;//байты
    public avatarMiniId: string;
    public vkLink: string;
    public youTubeLink: string;
    public facebookLink: string;
    public soundCloudLink: string;

    public address: string;

    public isActive: boolean;
}