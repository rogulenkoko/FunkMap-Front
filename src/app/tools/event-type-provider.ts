import { Injectable } from '@angular/core';
import { Dictionary } from "typescript-collections";
import { EventType } from 'app/main/event/models/event';

@Injectable()
export class EventTypeProvider {

  public eventTypes: Dictionary<EventType, string>;

  constructor() {
    this.initEventTypes();
  }

  private initEventTypes() {
    this.eventTypes = new Dictionary<EventType, string>();
    this.eventTypes.setValue(EventType.Concert, "Event_Concert");
    this.eventTypes.setValue(EventType.Jam, "Event_Jam");
    this.eventTypes.setValue(EventType.MasterClass, "Event_MasterClass");
  }

}
