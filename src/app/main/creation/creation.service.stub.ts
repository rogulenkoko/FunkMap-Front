import { Injectable } from '@angular/core';
import { InstrumentType, Musician, MusicStyle, Sex } from "../musician/models";
import { EntityType } from "../map/models";
import { CreationService } from "./creation.service";
import { Observable } from "rxjs/Observable";
import { CreationResponse } from "./creation";

@Injectable()
export class CreationServiceStub extends CreationService {

  constructor() {
    super();
   }

   saveMusician():Observable<CreationResponse>{
    var response = new CreationResponse(true);
    return Observable.of(response);
  }

}
