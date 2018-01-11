import { environment } from "environments/environment";
export class ConfigurationProvider{

    public static apiUrl(type: ServiceType): string{

        if(environment.monolith) return environment.local ? "http://localhost:9000/api/" :  "http://95.213.239.58:14080/api/"; 

        switch (type){ 
            case ServiceType.Auth:
            return environment.local ? "http://localhost:9001/api/" : "";

            case ServiceType.Messenger:
            return environment.local ? "" : "";
        }
    }
    
    public static entitiesLimit: number = 1000;

    public static soundcloudApi = "http://api.soundcloud.com/";
    public static soundcloudKey = "8e1349e63dfd43dc67a63e0de3befc68"; //todo сделать свой

}


export enum ServiceType{
    Auth = 1,
    Messenger = 2,
    Funkmap = 3,
    Notifications = 4

}