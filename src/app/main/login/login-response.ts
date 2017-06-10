import { User } from "../user/user";

export class LoginResponse{
  constructor(public token: string, public login: string){

  }

  public expiresDate: Date;
  public issuedDate: Date;

  public refreshToken: string;
  public expiresIn: number;

  public static ToLoginResponsne(data: any):LoginResponse{
    var result = new LoginResponse(data.access_token, data.Login);
    result.expiresDate = new Date(data['.expires']);
    result.issuedDate = new Date(data['.issued']);
    result.expiresIn = data.expires_in;
    result.refreshToken = data.refresh_token;
    return result;
  }
}