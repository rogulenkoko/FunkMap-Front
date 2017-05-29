import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Musician, MusicStyle } from "./models";

@Injectable()
export abstract class MusicianService {

  constructor() { }

  abstract getMusician(id: number): Observable<Musician>;

}

@Injectable()
export class MusicianServiceHttp extends MusicianService {

  constructor() {
    super();
   }


   getMusician(id: number): Observable<Musician>{
     return;
   }

}
