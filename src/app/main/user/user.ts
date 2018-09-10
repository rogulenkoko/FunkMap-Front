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

    public isSocial: boolean;

}

export class UserResponse {
    public user: User;
    public isExist: boolean;

    public static ToUserResponse(data: any): UserResponse {
        var result = new UserResponse();
        result.isExist = data.IsExists;
        if (result.isExist) {
            var user = new User();
            user.login = data.User.Login;
            user.avatar = data.User.AvatarUrl;
            user.name = data.User.Name;
            user.provider = AuthProvider.Funkmap;
            user.isSocial = data.User.IsSocial;
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