import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from "@angular/http"
import { AuthResponse } from "./login-response";
import { Observable } from "rxjs/Observable";
import { ConfigurationProvider } from "app/core/configuration/configuration-provider";
import { RegistrationRequest, RegistrationModel } from "./registration/registration-model";
import { ConfirmationRequest, ConfirmationResponse } from "./registration/confirmation-model";
import { HttpClient } from "app/core/http/http-client.service";

@Injectable()
export abstract class LoginService {

  constructor() { }

  abstract login(login: string, password: string): Observable<AuthResponse>;

  //abstract prolongate(refreshToken: string): Observable<LoginResponse>;

  abstract register(request: RegistrationRequest): Observable<RegistrationModel>;

  abstract sendEmail(request: RegistrationRequest): Observable<ConfirmationResponse>;

  abstract confirm(request: ConfirmationRequest): Observable<ConfirmationResponse>;

}

@Injectable()
export class LoginServiceHttp extends LoginService {

  constructor(private http: HttpClient) {
    super();
   }

   login(login: string, password: string): Observable<AuthResponse>{
     var options = new RequestOptions();
     options.headers = new Headers();
     options.headers.append("Content-Type","x-www-form-urlencoded");

     var params = new URLSearchParams();
     params.set("username", login);
     params.set("password", password);
     params.set("grant_type", "password");
     return this.http.post(`${ConfigurationProvider.apiUrl}token`,params, options).map(x=>AuthResponse.ToLoginResponsne(x.json()));
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


