import { Injectable } from '@angular/core';
import { InstrumentType, Musician, MusicStyle, Sex } from "../musician/models";
import { EntityType } from "../map/models";
import { CreationService } from "./creation.service";
import { Observable } from "rxjs/Observable";
import { CreationResponse } from "./creation";
import { UserService } from "../user/user.service";

@Injectable()
export class CreationServiceStub extends CreationService {

  constructor() {
    super();
   }

   save():Observable<CreationResponse>{
    var entity = this.buildEntity();
    var response = new CreationResponse(true);
    return Observable.of(response);
  }

  checkLogin(login: string): Observable<boolean>{
    return Observable.of(false);
  }

}
