import { AuthResponse } from "app/main/login/login-response";
import { EntityType } from "app/main/map/models";

export class User{

    public login: string;

    public avatar: string;

    public entities: Array<EntityType>;

    public authData: AuthResponse;

    public name: string;

}

export class UserResponse{
    public user: User;
    public isExist: boolean;

    public static ToUserResponse(data: any): UserResponse{
        var result = new UserResponse();

        result.isExist = data.IsExist;
        if(result.isExist){
            var user = new User();
            user.login = data.Login;
            user.avatar = data.Avatar;
            user.name = data.Name;
            result.user = user;
        }

        return result;
    }

}