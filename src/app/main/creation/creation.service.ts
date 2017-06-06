import { Injectable } from '@angular/core';
import { InstrumentType, Musician, MusicStyle, Sex } from "../musician/models";
import { EntityType } from "../map/models";
import { Http } from "@angular/http"
import { Observable } from "rxjs/Observable";
import { CreationResponse } from "./creation";

@Injectable()
export abstract class CreationService {

  public selectedEntity: EntityType;

  public musician: Musician;

  abstract saveMusician():Observable<CreationResponse>;

  constructor() { }

}

@Injectable()
export class CreationServiceHttp extends CreationService{

  constructor() { 
    super();
  }

  saveMusician():Observable<CreationResponse>{
    return;
  }

}
