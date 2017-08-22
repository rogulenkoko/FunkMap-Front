import { BaseModel } from "app/core";
import { MusicStyle, Sex, InstrumentType, ExpirienceType } from "./musician";
import { EntityType } from "app/main/map/models";

export class MusicianPreview extends BaseModel{

    constructor(login?:string, name?:string, entityType?: EntityType){
        super(login, name, entityType);
        this.styles = [];
    }
   

    public styles: Array<MusicStyle>;
   
    public expirience: ExpirienceType;
    public instrument: InstrumentType;

    public static ToMusicianPreview(data: any): MusicianPreview{
        var result = new MusicianPreview(data.Login, data.Name, EntityType.Musician);
        result.description = data.Description;
        result.expirience = data.Expirience;
        result.styles = data.Styles;
        result.avatar = data.Avatar;
        result.vkLink = data.VkLink;
        result.youTubeLink = data.YouTubeLink;
        result.facebookLink = data.FacebookLink;
        result.soundCloudLink = data.SoundCloudLink;
        return result;
    }
}