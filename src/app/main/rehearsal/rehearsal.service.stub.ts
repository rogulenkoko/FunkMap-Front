import { Injectable } from '@angular/core';
import { RehearsalService } from "app/main/rehearsal/rehearsal.service";
import { Observable } from "rxjs/Observable";
import { RehearsalPreview } from "app/main/rehearsal/models/rehearsal-preview";

@Injectable()
export class RehearsalServiceStub extends RehearsalService {

  constructor() {
    super();
  }

  getRehearsal(login: string): Observable<RehearsalPreview> {
    var r = new RehearsalPreview("1","Реп точка");
    return Observable.of(r);
  }

}