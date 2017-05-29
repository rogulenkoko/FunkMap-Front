import { User } from "../user/user";

export class LoginResponse{
  constructor(public isLogged: boolean){

  }

  public user: User;
}