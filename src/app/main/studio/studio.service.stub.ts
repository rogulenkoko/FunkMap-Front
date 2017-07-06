import { Injectable } from '@angular/core';
import { StudioService } from "app/main/studio/studio.service";
import { Observable } from "rxjs/Observable";
import { StudioPreview } from "app/main/studio/models/studio-preview";

@Injectable()
export class StudioServiceStub extends StudioService {

  constructor() {
    super();
   }

   getStudio(login: string):Observable<StudioPreview>{
     var s = new StudioPreview("st","Студия");
     return Observable.of(s);
   }

}
