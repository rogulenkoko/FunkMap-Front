import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { UserService } from "app/main/user/user.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class HttpClient {

  private options: RequestOptions;

  constructor(private http: Http, private userService: UserService) {
    this.options = new RequestOptions();
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    this.options.headers = headers;
    this.userService.onUserChanged.subscribe(()=>this.updateOptions());
  }

  public post(url: string, data: any, options?:any): Observable<any> {

    return this.http.post(url, data, options ? options : this.options);
  }

  public get(url: string,  options?:any): Observable<any> {
    return this.http.get(url, options ? options : this.options);
  }

  private updateOptions() {
    console.log(this.userService.user);
    this.options.headers.append("Authorization", `Bearer ${this.userService.user.authData.token}`);
  }

}
