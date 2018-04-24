import { environment } from "environments/environment";
export class ConfigurationProvider{

    public static apiUrl(type: ServiceType): string{

        return environment.local ? "http://localhost:49447/api/" :  "https://bandmap-api.azurewebsites.net/api/"; 
        
    }
    
    public static entitiesLimit: number = 1000;
    public static maxProfilesCount: number = 5;

    public static soundcloudApi = "https://api.soundcloud.com/";
    public static soundcloudKey = "<souncloudkey>";

    public static facebookKey = "<facebookkey>";

}


export enum ServiceType {
    Auth = 1,
    Messenger = 2,
    Funkmap = 3,
    Notifications = 4
}