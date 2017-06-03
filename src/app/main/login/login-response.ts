import { User } from "../user/user";

export class LoginResponse{
  constructor(public token: string, public login: string){

  }

  public static ToLoginResponsne(data: any):LoginResponse{
    console.log(data);
    var result = new LoginResponse(data.access_token, data.Login);
    return result;
  }
}