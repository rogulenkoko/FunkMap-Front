import { AuthResponse } from "app/main/login/login-response";
import { EntityType } from "app/main/map/models";

export class User {

    public login: string;

    public avatar: string;

    public entities: Array<EntityType>;

    public expiresDate: Date;
    public issuedDate: Date;
    public token: string;
    public refreshToken: string;
    public expiresIn: number;

    public name: string;

    public provider: AuthProvider;

}

export class UserResponse {
    public user: User;
    public isExist: boolean;

    public static ToUserResponse(data: any): UserResponse {
        var result = new UserResponse();

        result.isExist = data.IsExist;
        if (result.isExist) {
            var user = new User();
            user.login = data.Login;
            user.avatar = data.Avatar;
            user.name = data.Name;
            user.provider = AuthProvider.Funkmap;
            result.user = user;
        }

        return result;
    }

}

export enum AuthProvider {
    Funkmap = 0,
    Facebook = 1,
    Google = 2
}