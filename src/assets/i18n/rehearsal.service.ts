import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { RehearsalPreview } from "app/main/rehearsal/models/rehearsal-preview";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider } from "app/core";

@Injectable()
export abstract class RehearsalService {

  constructor() { }

  abstract getRehearsal(login: string): Observable<RehearsalPreview>;
}

@Injectable()
export class RehearsalServiceHttp extends RehearsalService {

  constructor(private http: HttpClient) {
    super();
  }

  getRehearsal(login: string): Observable<RehearsalPreview> {
    return this.http.get(`${ConfigurationProvider.apiUrl}rehearsal/get/${login}`).map(x=>RehearsalPreview.ToRehearsalPreview(x.json()));
  }

}