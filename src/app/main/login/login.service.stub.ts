import { Injectable } from '@angular/core';
import { LoginService } from "./login.service";
import { LoginResponse } from "./login-response";
import { Observable } from "rxjs/Observable";
import { User } from "../user/user";

@Injectable()
export class LoginServiceStub extends LoginService {

  constructor() {
    super();
  }

  login(login: string, password: string): Observable<LoginResponse> {
    if (login == "test" && password == "test") {
      var response = new LoginResponse("token", "rogulenkoko");
      return Observable.of(response);
    }
    return Observable.of(new LoginResponse("token", "rogulenkoko"));
  }

  register(login: string, password: string): Observable<LoginResponse> {
    return;
  }

}
