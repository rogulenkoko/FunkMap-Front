import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from "@angular/http"
import { AuthResponse } from "./login-response";
import { Observable } from "rxjs/Observable";
import { ConfigurationProvider, ServiceType } from "app/core/configuration/configuration-provider";
import { RegistrationRequest, RegistrationModel } from "./registration/registration-model";
import { ConfirmationRequest, ConfirmationResponse } from "./registration/confirmation-model";
import { HttpClient } from "app/core/http/http-client.service";
import { BaseResponse } from 'app/tools/models/base-response';
import { ConfirmRestoreRequest } from 'app/main/login/restore-password/confirm-restore-request';
import { AuthProvider } from 'app/main/user/user';
import { ExternalSignupRequest } from 'app/main/login/registration/external-signup';

@Injectable()
export abstract class LoginService {

  constructor() { }

  abstract login(login: string, password: string): Observable<AuthResponse>;

  abstract socialLogin(token: string, provider: string): Observable<AuthResponse>;

  abstract signup(request: RegistrationRequest): Observable<ConfirmationResponse>;

  abstract confirm(request: ConfirmationRequest): Observable<ConfirmationResponse>;

  abstract askRestoreCode(loginOrEmail: string): Observable<BaseResponse>;

  abstract confirmRestore(request: ConfirmRestoreRequest): Observable<BaseResponse>;

}

@Injectable()
export class LoginServiceHttp extends LoginService {

  constructor(private http: HttpClient) {
    super();
  }

  login(login: string, password: string): Observable<AuthResponse> {
    var options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append("Content-Type", "x-www-form-urlencoded");

    var params = new URLSearchParams();
    params.set("username", login);
    params.set("password", password);
    params.set("grant_type", "password");
    params.set("client_id", "funkmap");
    params.set("client_secret", "funkmap");
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Auth)}token`, params, options).map(x => AuthResponse.ToLoginResponsne(x.json()));
  }

  socialLogin(token: string, provider: string): Observable<AuthResponse>{
    var options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append("Content-Type", "x-www-form-urlencoded");

    var params = new URLSearchParams();
    params.set("provider", provider);
    params.set("token", token);
    params.set("grant_type", "password");
    params.set("client_id", "funkmap");
    params.set("client_secret", "funkmap");
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Auth)}token`, params, options).map(x => AuthResponse.ToLoginResponsne(x.json()));
  }

  signup(request: RegistrationRequest): Observable<ConfirmationResponse> {
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Auth)}auth/signup`, request).map(x => RegistrationModel.ToRegistrationModel(x.json()));
  }

  confirm(request: ConfirmationRequest): Observable<ConfirmationResponse> {
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Auth)}auth/signup/confirm`, request).map(x => RegistrationModel.ToRegistrationModel(x.json()));
  }

  askRestoreCode(loginOrEmail: string): Observable<BaseResponse> {
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Auth)}auth/restore/${loginOrEmail}`, "").map(x => BaseResponse.ToBaseResponse(x.json()));
  }

  confirmRestore(request: ConfirmRestoreRequest): Observable<BaseResponse> {
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Auth)}auth/restore/cofirm`, request).map(x => BaseResponse.ToBaseResponse(x.json()));
  }

}


