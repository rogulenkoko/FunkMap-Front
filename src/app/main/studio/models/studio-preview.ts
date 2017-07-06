
import { BaseModel } from "app/core";

export class StudioPreview extends BaseModel {
    constructor(login:string, name:string){
        super(login, name);
    }
    public address: string;

     public static ToStudioPreview(data: any): StudioPreview{
        var result = new StudioPreview(data.Login, data.Name);
        result.address = data.Address;
        result.description = data.Description;
        result.avatar = data.Avatar;
        result.vkLink = data.VkLink;
        result.youTubeLink = data.YouTubeLink;
        result.facebookLink = data.FacebookLink;
        console.log(result);
        return result;
    }
}