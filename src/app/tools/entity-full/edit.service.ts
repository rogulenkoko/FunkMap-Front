import { Injectable, EventEmitter } from '@angular/core';
import { BaseModel } from "app/core";

@Injectable()
export class EditService {

  public baseModel: BaseModel;

  public onSaved: EventEmitter<any>;

  constructor() {
     this.onSaved = new EventEmitter();
  }

}
