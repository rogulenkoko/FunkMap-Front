import { Injectable } from '@angular/core';
import { InstrumentType, Musician, MusicStyle, Sex } from "../musician/models";
import { EntityType } from "../map/models";
import { CreationService } from "./creation.service";
import { Observable } from "rxjs/Observable";
import { UserService } from "../user/user.service";
import { BaseResponse } from 'app/tools';

@Injectable()
export class CreationServiceStub extends CreationService {

  constructor() {
    super();
   }

   save():Observable<BaseResponse>{
    var entity = this.buildEntity();
    var response = new BaseResponse(true);
    return Observable.of(response);
  }

  checkLogin(login: string): Observable<boolean>{
    return Observable.of(false);
  }

}
