import { Injectable } from '@angular/core';
import { InstrumentType, Musician, MusicStyle, Sex } from "../musician/models";
import { EntityType } from "../map/models";
import { CreationService } from "./creation.service";
import { Observable } from "rxjs/Observable";
import { CreationResponse } from "./creation";
import { UserService } from "../user/user.service";

@Injectable()
export class CreationServiceStub extends CreationService {

  constructor(protected userService: UserService) {
    super(userService);
   }

   save():Observable<CreationResponse>{
    var entity = this.buildEntity();
    var response = new CreationResponse(true);
    console.log(entity);
    return Observable.of(response);
  }

}
