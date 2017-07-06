import { AuthResponse } from "app/main/login/login-response";
import { EntityType } from "app/main/map/models";

export class User{

    public login: string;

    public entities: Array<EntityType>;

    public authData: AuthResponse;

}