import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { StudioPreview } from "app/main/studio/models/studio-preview";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider } from "app/core";

@Injectable()
export abstract class StudioService {

  constructor() { }

  abstract getStudio(login: string):Observable<StudioPreview>;

}

@Injectable()
export class StudioServiceHttp extends StudioService {

  constructor(private http: HttpClient) {
    super();
   }
   
   getStudio(login: string):Observable<StudioPreview>{
     return this.http.get(`${ConfigurationProvider.apiUrl}studio/get/${login}`).map(x=>StudioPreview.ToStudioPreview(x.json()));
   }

}
