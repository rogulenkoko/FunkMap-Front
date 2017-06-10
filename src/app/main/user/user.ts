import { LoginResponse } from "app/main/login/login-response";

export class User{

    public login: string;
    public image: string;

    public entities: Array<EntityType>;

    public authData: LoginResponse;

}

export enum EntityType{
    Musician = 1,
    Shop = 2,
    Group = 3
}