import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Band } from "./band";

@Injectable()
export abstract class BandService {

  constructor() { }

  abstract getBand(id: number): Observable<Band>;

}

@Injectable()
export class BandServiceHttp extends BandService {

  constructor() {
    super();
   }

   getBand(id: number): Observable<Band>{
     return;
   }

}
