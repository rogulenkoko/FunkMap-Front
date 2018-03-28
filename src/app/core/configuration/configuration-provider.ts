import { environment } from "environments/environment";
export class ConfigurationProvider{

    public static apiUrl(type: ServiceType): string{

        return environment.local ? "http://localhost:9000/api/" :  "https://bandmap-api.azurewebsites.net/api/"; 
        
    }
    
    public static entitiesLimit: number = 1000;
    public static maxProfilesCount: number = 5;

    public static soundcloudApi = "https://api.soundcloud.com/";
    public static soundcloudKey = "8e1349e63dfd43dc67a63e0de3befc68"; //todo сделать свой

    public static facebookKey = "211667802913192";

}


export enum ServiceType{
    Auth = 1,
    Messenger = 2,
    Funkmap = 3,
    Notifications = 4

}