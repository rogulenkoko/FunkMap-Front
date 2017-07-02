import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { UserService } from "app/main/user/user.service";
import { User } from "app/main/user/user";
import { AuthResponse } from "app/main/login/login-response";
import { Observable } from "rxjs/Observable";
import { ConfigurationProvider } from "app/core/configuration/configuration-provider";
import { Scheduler } from "rxjs/Scheduler";

@Injectable()
export class HttpClient {

  private options: RequestOptions;

  constructor(private http: Http, private userService: UserService) {
    this.initOptions();
    this.updateOptions(); 
    this.userService.onUserChanged.subscribe(() => this.updateOptions());
  }

  public post(url: string, data: any, options?: any): Observable<any> {

    return this.http.post(url, data, options ? options : this.options);
  }

  public get(url: string, options?: any): Observable<any> {
    return this.http.get(url, options ? options : this.options);
  }

  //todo подумать может стоит вынести и в каком месте использовать
  private prolongate() {
    if (!this.userService.user) {
      return;
    }
    var options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append("Content-Type", "x-www-form-urlencoded");

    var params = new URLSearchParams();
    params.set("refresh_token", this.userService.user.authData.refreshToken);
    params.set("grant_type", "refresh_token");
    return this.http.post(`${ConfigurationProvider.apiUrl}token`, params).map(x => AuthResponse.ToLoginResponsne(x.json())).subscribe((response)=>this.setRefreshedData(response));
  }

  private setRefreshedData(authData: AuthResponse){
    var user = new User();
    user.login = authData.login;
    user.authData = authData;
    this.userService.user = user; 
  }

  private initOptions(){
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
