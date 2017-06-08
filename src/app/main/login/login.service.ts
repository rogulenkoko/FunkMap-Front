import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from "@angular/http"
import { LoginResponse } from "./login-response";
import { Observable } from "rxjs/Observable";
import { ConfigurationProvider } from "app/core/configuration/configuration-provider";
import { RegistrationRequest, RegistrationModel } from "./registration/registration-model";
import { ConfirmationRequest, ConfirmationResponse } from "./registration/confirmation-model";

@Injectable()
export abstract class LoginService {

  constructor() { }

  abstract login(login: string, password: string): Observable<LoginResponse>;

  abstract prolongate(refreshToken: string): Observable<LoginResponse>;

  abstract register(request: RegistrationRequest): Observable<RegistrationModel>;

  abstract sendEmail(request: RegistrationRequest): Observable<ConfirmationResponse>;

  abstract confirm(request: ConfirmationRequest): Observable<ConfirmationResponse>;

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

   prolongate(refreshToken: string): Observable<LoginResponse>{
     var options = new RequestOptions();
     options.headers = new Headers();
     options.headers.append("Content-Type","x-www-form-urlencoded");

     var params = new URLSearchParams();
     params.set("refresh_token", refreshToken);
     params.set("grant_type", "refresh_token");
     return this.http.post(`${ConfigurationProvider.apiUrl}token`,params).map(x=>LoginResponse.ToLoginResponsne(x.json()));
   }

  

   register(request: RegistrationRequest): Observable<RegistrationModel>{
     return this.http.post(`${ConfigurationProvider.apiUrl}auth/register`,request).map(x=>RegistrationModel.ToRegistrationModel(x.json()));
   }

   sendEmail(request: RegistrationRequest): Observable<ConfirmationResponse>{
     return this.http.post(`${ConfigurationProvider.apiUrl}auth/sendEmail`,request).map(x=>RegistrationModel.ToRegistrationModel(x.json()));
   }

   confirm(request: ConfirmationRequest): Observable<ConfirmationResponse>{
     return this.http.post(`${ConfigurationProvider.apiUrl}auth/confirm`,request).map(x=>RegistrationModel.ToRegistrationModel(x.json()));;;
   }

}


