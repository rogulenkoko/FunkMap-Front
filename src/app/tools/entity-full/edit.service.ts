import { Injectable, EventEmitter } from '@angular/core';
import { BaseModel } from "app/core";
import { Musician } from 'app/main/musician/models';

@Injectable()
export class EditService {

  private _baseModel: BaseModel;

  public get baseModel(): BaseModel{
    return this._baseModel;
  }

  public set baseModel(value: BaseModel){
    this._baseModel = value;
    this.onSaved.emit(value);
  }

  public onSaved: EventEmitter<BaseModel>;

  constructor() {
     this.onSaved = new EventEmitter<BaseModel>();
  }

}
