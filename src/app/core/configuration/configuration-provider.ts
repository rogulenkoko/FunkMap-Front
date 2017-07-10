import { environment } from "environments/environment";
export class ConfigurationProvider{

    public static get apiUrl(): string{
        return environment.local ? "http://localhost:9000/api/" :  "http://136.243.24.102:33967/api/"; 
    }

}