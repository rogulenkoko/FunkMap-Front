import { Injectable } from '@angular/core';
import { RehearsalService } from "app/main/rehearsal/rehearsal.service";
import { Observable } from "rxjs/Observable";
import { RehearsalPreview, Rehearsal } from "app/main/rehearsal/models/rehearsal-preview";
import { EntityType } from "app/main/map/models";
import { BaseResponse } from "app/tools";

@Injectable()
export class RehearsalServiceStub extends RehearsalService {

  constructor() {
    super();
  }

  getRehearsalPreview(login: string): Observable<RehearsalPreview> {
    var r = new RehearsalPreview("1", "Реп точка", EntityType.RehearsalPoint);
    return Observable.of(r);
  }

  getRehearsal(login: string): Observable<Rehearsal> {
    var r = new Rehearsal("1", "Реп точка", EntityType.RehearsalPoint);
    r.vkLink = "asd";
    r.youTubeLink = "asd";
    r.login = "test1";
    r.latitude = 10;
    r.longitude = 30;
    r.description = "Описание реп точки";
    return Observable.of(r);
  }

  updateRehearsal(rehersal: Rehearsal): Observable<BaseResponse> {
    return Observable.of(new BaseResponse(true));
  }

}