import { environment } from "environments/environment";
export class ConfigurationProvider{

    public static get apiUrl(): string{
        return environment.local ? "http://localhost:9000/api/" : "asd";
    }

}