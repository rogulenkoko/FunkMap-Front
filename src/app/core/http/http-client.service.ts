import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from "@angular/http";
import { UserService } from "app/main/user/user.service";
import { User } from "app/main/user/user";
import { AuthResponse } from "app/main/login/login-response";
import { Observable } from "rxjs/Observable";
import { ConfigurationProvider, ServiceType } from "app/core/configuration/configuration-provider";
import { Scheduler } from "rxjs/Scheduler";
import 'rxjs/add/operator/catch';
import { Router } from "@angular/router";

@Injectable()
export class HttpClient {

  private options: RequestOptions;

  constructor(private http: Http, private userService: UserService, private router: Router) {
    this.initOptions();
    this.updateOptions();
    this.userService.onUserChanged.subscribe(() => this.updateOptions());
  }

  public post(url: string, data: any, options?: any): Observable<any> {
    if (this.userService.user && this.userService.user.authData && new Date(this.userService.user.authData.expiresDate) <= new Date()) {
      return this.prolongate().switchMap(response => {

        this.setRefreshedData(response, true);
        this.updateOptions();
        return this.http.post(url, data, options ? options : this.options).catch(error=> this.handleError(error));
      }).catch(error => this.handleError(error))
    }
    return this.http.post(url, data, options ? options : this.options).catch(error=> this.handleError(error));
  }

  public get(url: string, options?: any): Observable<any> {
    if (this.userService.user && this.userService.user.authData && new Date(this.userService.user.authData.expiresDate) <= new Date()) {
      return this.prolongate().switchMap(response => {
        this.setRefreshedData(response, true);
        this.updateOptions();
        return this.http.get(url, options ? options : this.options).catch(error=> this.handleError(error));
      }).catch(error => this.handleError(error))
    }
    return this.http.get(url, options ? options : this.options).catch(error=> this.handleError(error));
  }

  //todo подумать может стоит вынести и в каком месте использовать
  private prolongate(): Observable<AuthResponse> {
    if (!this.userService.user) {
      return;
    }
    var options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append("Content-Type", "x-www-form-urlencoded");

    var params = new URLSearchParams();
    params.set("refresh_token", this.userService.user.authData.refreshToken);
    params.set("grant_type", "refresh_token");

    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Auth)}token`, params, options).map(x => AuthResponse.ToLoginResponsne(x.json()));
  }

  private handleError(error: any): Observable<any> {
    if(error.status == 401){
      this.userService.user = undefined;
      this.router.navigate(['/login']);
    }
    return Observable.of(error);
  }

  private setRefreshedData(authData: AuthResponse, withoutUserUpdate?: boolean) {
    if (withoutUserUpdate) {
      this.userService.user.authData = authData;
      return;
    }
    var user = new User();
    user.login = authData.login;
    user.authData = authData;
    this.userService.user = user;
  }

  private initOptions() {
    this.options = new RequestOptions();
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    this.options.headers = headers;
  }

  private updateOptions() {
    var token = this.userService.user ? this.userService.user.authData.token : "";
    this.options.headers.delete("Authorization");
    this.options.headers.append("Authorization", `Bearer ${token}`);
  }

}
