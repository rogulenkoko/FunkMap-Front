import { InstrumentType, MusicStyle } from "../../musician/models"
import { BaseModel } from "app/core";
import { EntityType } from "app/main/map/models";

export class BandPreview extends BaseModel{
    constructor(login:string, name:string, entityType?: EntityType) {
        super(login, name, entityType);
    }

    public styles: Array<MusicStyle>;
    public desiredInstruments: Array<InstrumentType>;
    public musicians: Array<string>;
    public description: string;

    public static ToBandPreview(data: any): BandPreview{
        var result = new BandPreview(data.Login, data.Name, EntityType.Band);
        result.desiredInstruments = data.DesiredInstruments;
        result.musicians = data.Musicians;
        result.styles = data.Styles;
        result.description = data.Description;

        result.avatarId = data.AvatarId;
        result.avatarMiniId = data.AvatarMiniId;

        result.vkLink = data.VkLink;
        result.youTubeLink = data.YoutubeLink;
        result.facebookLink = data.FacebookLink;
        result.soundCloudLink = data.SoundCloudLink;
        result.userLogin = data.UserLogin;
        return result;
    }
}