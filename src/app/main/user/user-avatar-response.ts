
export class UserAvatarResponse{
    constructor(public login: string, public image: string){

    }

    public static ToUserAvatarResponses(data: any):Array<UserAvatarResponse>{
        if(!data || !data.length) return;
        var result = new Array<UserAvatarResponse>()
        data.forEach(element => {
            result.push(new UserAvatarResponse(element.Login, element.Avatar));
        });
        return result;
    }
}