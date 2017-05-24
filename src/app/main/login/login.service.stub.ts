import { Injectable } from '@angular/core';
import { LoginService } from "./login.service";
import { LoginResponse } from "./login-response";
import { Observable } from "rxjs/Observable";

@Injectable()
export class LoginServiceStub extends LoginService {

  constructor() {
    super();
   }

   login(login: string, password: string):Observable<LoginResponse>{
     if(login == "1" && password == "1") return Observable.of(new LoginResponse(true));
     return Observable.of(new LoginResponse(false));
   }

   register(login: string, password: string): Observable<LoginResponse>{
     return;
   }

}
