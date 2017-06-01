import { Injectable } from '@angular/core';
import { Http } from "@angular/http"
import { Observable } from "rxjs/Observable";
import { Musician, MusicStyle } from "./models";
import { ConfigurationProvider } from "app/core/configuration/configuration-provider";

@Injectable()
export abstract class MusicianService {

  constructor() { }

  abstract getMusician(id: number): Observable<Musician>;

}

@Injectable()
export class MusicianServiceHttp extends MusicianService {

  constructor(private http: Http) {
    super();
   }


   getMusician(id: number): Observable<Musician>{
     return this.http.get(ConfigurationProvider.apiUrl + "musician/" + id).map(x=>Musician.ToMusician(x.json()));
   }

}
