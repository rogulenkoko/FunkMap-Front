
import { BaseModel } from "app/core";
import { EntityType } from "app/main/map/models";


export class Rehearsal extends BaseModel {
    constructor(login?: string, name?: string, entityType?: EntityType) {
        super(login, name, entityType);
    }
    public address: string;

    public static ToRehearsal(data: any): Rehearsal {
        var result = new Rehearsal(data.Login, data.Name, EntityType.RehearsalPoint);
        result.address = data.Address;
        result.description = data.Description;

        result.avatarId = data.AvatarId;
        result.avatarMiniId = data.AvatarMiniId;

        result.vkLink = data.VkLink;
        result.youTubeLink = data.YoutubeLink;
        result.facebookLink = data.FacebookLink;

        result.soundCloudLink = data.SoundCloudLink;

        result.latitude = data.Latitude;
        result.longitude = data.Longitude;
        result.address = data.Address;
        result.userLogin = data.UserLogin;
        result.isActive = data.IsActive;
        return result;
    }
}


export class RehearsalPreview extends BaseModel {
    constructor(login: string, name: string, entityType: EntityType) {
        super(login, name, entityType);
    }
    public address: string;

    public static ToRehearsalPreview(data: any): RehearsalPreview {
        var result = new RehearsalPreview(data.Login, data.Name, EntityType.RehearsalPoint);
        result.address = data.Address;
        result.description = data.Description;

        result.avatarId = data.AvatarId;
        result.avatarMiniId = data.AvatarMiniId;
        
        result.vkLink = data.VkLink;
        result.youTubeLink = data.YoutubeLink;
        result.facebookLink = data.FacebookLink;
        result.userLogin = data.UserLogin;
        result.isActive = data.IsActive;
        return result;
    }
}