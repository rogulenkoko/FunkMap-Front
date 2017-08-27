
import { BaseModel } from "app/core";
import { EntityType } from "app/main/map/models";


export class Studio extends BaseModel {
    constructor(login?:string, name?:string, entityType?: EntityType){
        super(login, name, entityType);
    }
    public address: string;

     public static ToStudio(data: any): Studio{
        var result = new Studio(data.Login, data.Name, EntityType.Studio);
        result.address = data.Address;
        result.description = data.Description;
        result.avatar = data.Avatar;
        result.vkLink = data.VkLink;
        result.youTubeLink = data.YouTubeLink;
        result.facebookLink = data.FacebookLink;
        result.soundCloudLink = data.SoundCloudLink;
        result.latitude = data.Latitude;
        result.longitude = data.Longitude;
        result.address = data.Address;
        return result;
    }
}


export class StudioPreview extends BaseModel {
    constructor(login:string, name:string, entityType?: EntityType){
        super(login, name, entityType);
    }
    public address: string;

     public static ToStudioPreview(data: any): StudioPreview{
        var result = new StudioPreview(data.Login, data.Name, EntityType.Studio);
        result.address = data.Address;
        result.description = data.Description;
        result.avatar = data.Avatar;
        result.vkLink = data.VkLink;
        result.youTubeLink = data.YouTubeLink;
        result.facebookLink = data.FacebookLink;
        result.soundCloudLink = data.SoundCloudLink;
        return result;
    }
}