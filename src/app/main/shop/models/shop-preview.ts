
import { BaseModel } from "app/core";

export class ShopPreview extends BaseModel {

    constructor(login:string, name:string){
        super(login, name);
    }

    public webSite: string; 
    public address: string;

     public static ToShopPreview(data: any): ShopPreview{
        var result = new ShopPreview(data.Login, data.Name);
        result.webSite = data.WebSite;
        result.address = data.Address;
        result.description = data.Description;
        result.avatar = data.Avatar;
        result.vkLink = data.VkLink;
        result.youTubeLink = data.YouTubeLink;
        result.facebookLink = data.FacebookLink;
        return result;
    }
}