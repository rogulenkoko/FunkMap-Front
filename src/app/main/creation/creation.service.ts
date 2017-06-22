import { Injectable } from '@angular/core';
import { InstrumentType, Musician, MusicStyle, Sex } from "../musician/models";
import { EntityType } from "../map/models";
import { Http } from "@angular/http"
import { Observable } from "rxjs/Observable";
import { CreationResponse } from "./creation";
import { UserService } from "../user/user.service";
import { ConfigurationProvider } from "app/core/configuration/configuration-provider";
import { HttpClient } from "app/core/http/http-client.service";
import { BaseModel } from "app/core";

@Injectable()
export abstract class CreationService {

  public selectedEntity: EntityType;

  public baseModel: BaseModel

  public musician: Musician;

  abstract save():Observable<CreationResponse>;

  constructor(protected userService: UserService) {
    this.baseModel = new BaseModel();
    this.musician = new Musician();
   }


   buildEntity(): any{
     switch(this.selectedEntity){
       case EntityType.Musician:
        this.musician.facebookLink = this.baseModel.facebookLink;
        this.musician.vkLink = this.baseModel.vkLink;
        this.musician.youTubeLink = this.baseModel.youTubeLink;
        this.musician.videoYoutube = this.baseModel.videoYoutube;
        this.musician.userLogin = this.userService.user.login;
        this.musician.login = this.baseModel.login;
        this.musician.latitude = this.baseModel.latitude;
        this.musician.longitude = this.baseModel.longitude;
        
        return this.musician;
     }
   }

}

@Injectable()
export class CreationServiceHttp extends CreationService{

  constructor(private http: HttpClient, protected userService: UserService) { 
    super(userService);
    
  }

  save():Observable<CreationResponse>{
    var entity = this.buildEntity();
    return this.http.post(`${ConfigurationProvider.apiUrl}musician/save`,entity).map(x=>CreationResponse.ToCreationResponse(x.json()));
  }

}
