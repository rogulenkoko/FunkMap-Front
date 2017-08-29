import { Injectable, EventEmitter } from '@angular/core';
import { InstrumentType, Musician, MusicStyle, Sex } from "../musician/models";
import { EntityType } from "../map/models";
import { Http } from "@angular/http"
import { Observable } from "rxjs/Observable";
import { CreationResponse } from "./creation";
import { UserService } from "../user/user.service";
import { ConfigurationProvider } from "app/core/configuration/configuration-provider";
import { HttpClient } from "app/core/http/http-client.service";
import { BaseModel } from "app/core";
import { Band } from "app/main/band/models";

@Injectable()
export abstract class CreationService {

  public selectedEntity: EntityType;
  public baseModel: BaseModel
  public musician: Musician;
  public band: Band;

  public instrument: InstrumentType;

  abstract save():Observable<CreationResponse>;

  abstract checkLogin(login: string): Observable<boolean>;

  constructor() {
    this.baseModel = new BaseModel();
    this.musician = new Musician();
   }


   buildEntity(): any{
     switch(this.selectedEntity){
       case EntityType.Musician:
        this.musician.login = this.baseModel.login;
        this.musician.latitude = this.baseModel.latitude;
        this.musician.longitude = this.baseModel.longitude;
        this.musician.name = this.baseModel.name;
        this.musician.avatar = this.baseModel.avatar;
        this.musician.instrument = this.instrument;
        return this.musician;

        default: return this.baseModel;
     }
   }

}

@Injectable()
export class CreationServiceHttp extends CreationService{

  constructor(private http: HttpClient) { 
    super();
  }

  save():Observable<CreationResponse>{
    var entity = this.buildEntity();
    switch (this.selectedEntity){
      case EntityType.Musician: return this.http.post(`${ConfigurationProvider.apiUrl}musician/save`,entity).map(x=>CreationResponse.ToCreationResponse(x.json()));
      case EntityType.Band: return this.http.post(`${ConfigurationProvider.apiUrl}band/save`,entity).map(x=>CreationResponse.ToCreationResponse(x.json()));
      case EntityType.Shop: return this.http.post(`${ConfigurationProvider.apiUrl}shop/save`,entity).map(x=>CreationResponse.ToCreationResponse(x.json()));
      case EntityType.RehearsalPoint: return this.http.post(`${ConfigurationProvider.apiUrl}rehearsal/save`,entity).map(x=>CreationResponse.ToCreationResponse(x.json()));
      case EntityType.Studio: return this.http.post(`${ConfigurationProvider.apiUrl}studio/save`,entity).map(x=>CreationResponse.ToCreationResponse(x.json()));
    }
  }

  checkLogin(login: string): Observable<boolean>{
    return this.http.get(`${ConfigurationProvider.apiUrl}base/checkLogin/${login}`).map(x=> x.json());
  }
}
