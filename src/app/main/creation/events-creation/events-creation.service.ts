import { Injectable } from '@angular/core';
import { EventType, EventModel } from 'app/main/event/models/event';
import { Observable } from 'rxjs/Observable';
import { BaseResponse } from 'app/tools';
import { HttpClient } from 'app/core/http/http-client.service';
import { ConfigurationProvider } from 'app/core';
import { ServiceType } from 'app/core/configuration/configuration-provider';

@Injectable()
export abstract class EventsCreationService {


  eventType: EventType = EventType.Concert;
  name: string;
  date: Date;

  latitude: number;
  longitude: number;

  constructor() { }

  abstract save(): Observable<BaseResponse>;

}

@Injectable()
export class EventsCreationServiceHttp extends EventsCreationService {

  constructor(private http: HttpClient) {
    super();
   }

  save(): Observable<BaseResponse>{
    var event = this.buildEvent();
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Events)}event`, event).map(x => BaseResponse.ToBaseResponse(x.json()));
  }

  private buildEvent(): EventModel{
    var event = new EventModel("", this.eventType, this.name, this.date);
    event.latitude = this.latitude;
    event.longitude = this.longitude;
    return event;
  }

}

@Injectable()
export class EventsCreationServiceStub extends EventsCreationService {

  constructor() {
    super();
   }

  save(): Observable<BaseResponse>{
    return Observable.of(new BaseResponse(true));
  }

}
