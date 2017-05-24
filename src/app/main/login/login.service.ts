import { Injectable } from '@angular/core';
import { LoginResponse } from "./login-response";
import { Observable } from "rxjs/Observable";

@Injectable()
export abstract class LoginService {

  constructor() { }

  abstract login(login: string, password: string): Observable<LoginResponse>;

  abstract register(login: string, password: string): Observable<LoginResponse>;

}

@Injectable()
export class LoginServiceHttp extends LoginService {

  constructor() {
    super();
   }

   login(login: string, password: string): Observable<LoginResponse>{
     return;
   }

   register(login: string, password: string): Observable<LoginResponse>{
     return;
   }

}


