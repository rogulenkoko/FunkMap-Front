
import { BaseModel } from "app/core";

export class RehearsalPreview extends BaseModel {
     constructor(login:string, name:string){
        super(login, name);
    }
    public address: string;

     public static ToRehearsalPreview(data: any): RehearsalPreview{
        var result = new RehearsalPreview(data.Login, data.Name);
        result.address = data.Address;
        result.description = data.Description;
        result.avatar = data.Avatar;
        result.vkLink = data.VkLink;
        result.youTubeLink = data.YouTubeLink;
        result.facebookLink = data.FacebookLink;
        return result;
    }
 }