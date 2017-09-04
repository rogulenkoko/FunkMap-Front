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

}


export enum ServiceType{
    Auth = 1,
    Messenger = 2,
    Funkmap = 3,
    Notifications = 4

}