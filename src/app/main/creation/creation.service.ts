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
import { Entity } from "app/tools/models/entity";

@Injectable()
export abstract class CreationService {

  public selectedEntity: Entity;
  public baseModel: BaseModel
  public musician: Musician;
  public band: Band;

  public onSelectPosition: EventEmitter<any>;

  abstract save():Observable<CreationResponse>;

  constructor() {
    this.baseModel = new BaseModel();
    this.onSelectPosition = new EventEmitter();
   }


   buildEntity(): any{
     switch(this.selectedEntity.type){
       case EntityType.Musician:
       console.log(this.musician);
        this.musician.facebookLink = this.baseModel.facebookLink;
        this.musician.vkLink = this.baseModel.vkLink;
        this.musician.youTubeLink = this.baseModel.youTubeLink;
        this.musician.videoYoutube = this.baseModel.videoYoutube;
        this.musician.login = this.baseModel.login;
        this.musician.latitude = this.baseModel.latitude;
        this.musician.longitude = this.baseModel.longitude;
        this.musician.name = this.baseModel.name;
        this.musician.avatar = this.baseModel.avatar;
        
        return this.musician;

      case EntityType.Band:
        this.band.facebookLink = this.baseModel.facebookLink;
        this.band.vkLink = this.baseModel.vkLink;
        this.band.youTubeLink = this.baseModel.youTubeLink;
        this.band.videoYoutube = this.baseModel.videoYoutube;
        this.band.login = this.baseModel.login;
        this.band.latitude = this.baseModel.latitude;
        this.band.longitude = this.baseModel.longitude;
        this.band.name = this.baseModel.name;
        this.band.description = this.baseModel.description;
        this.band.avatar = this.baseModel.avatar;
      return this.band;
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
    switch (this.selectedEntity.type){
      case EntityType.Musician: return this.http.post(`${ConfigurationProvider.apiUrl}musician/save`,entity).map(x=>CreationResponse.ToCreationResponse(x.json()));
      case EntityType.Band: return this.http.post(`${ConfigurationProvider.apiUrl}band/save`,entity).map(x=>CreationResponse.ToCreationResponse(x.json()));
    }
    
  }

}
