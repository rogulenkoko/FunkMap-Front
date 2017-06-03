import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from "@angular/http"
import { LoginResponse } from "./login-response";
import { Observable } from "rxjs/Observable";
import { ConfigurationProvider } from "app/core/configuration/configuration-provider"

@Injectable()
export abstract class LoginService {

  constructor() { }

  abstract login(login: string, password: string): Observable<LoginResponse>;

  abstract register(login: string, password: string): Observable<LoginResponse>;

}

@Injectable()
export class LoginServiceHttp extends LoginService {

  constructor(private http: Http) {
    super();
   }

   login(login: string, password: string): Observable<LoginResponse>{
     var options = new RequestOptions();
     options.headers = new Headers();
     options.headers.append("Content-Type","x-www-form-urlencoded");

     var params = new URLSearchParams();
     params.set("username", login);
     params.set("password", password);
     params.set("grant_type", "password");
     return this.http.post(`${ConfigurationProvider.apiUrl}token`,params).map(x=>LoginResponse.ToLoginResponsne(x.json()));
   }

   register(login: string, password: string): Observable<LoginResponse>{
     return;
   }

}


