import { Injectable } from '@angular/core';
import { StudioService } from "app/main/studio/studio.service";
import { Observable } from "rxjs/Observable";
import { StudioPreview, Studio } from "app/main/studio/models/studio-preview";
import { EntityType } from "app/main/map/models";
import { BaseResponse } from "app/tools";

@Injectable()
export class StudioServiceStub extends StudioService {

  constructor() {
    super();
  }

  getStudioPreview(login: string): Observable<StudioPreview> {
    var s = new StudioPreview("st", "Студия", EntityType.Studio);
    return Observable.of(s);
  }

  getStudio(login: string): Observable<Studio> {
    var s = new Studio("test", "Студия", EntityType.Studio);
    s.latitude = 45;
    s.longitude = 55;
    
    return Observable.of(s);
  }

  updateStudio(studio: Studio): Observable<BaseResponse>{
    return Observable.of(new BaseResponse(true));
  }

}
