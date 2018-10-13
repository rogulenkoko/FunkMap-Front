import { Injectable, EventEmitter } from '@angular/core';
import { InstrumentType, Musician, MusicStyle, Sex } from "../musician/models";
import { EntityType } from "../map/models";
import { Http } from "@angular/http"
import { Observable } from "rxjs/Observable";
import { UserService } from "../user/user.service";
import { ConfigurationProvider, ServiceType } from "app/core/configuration/configuration-provider";
import { HttpClient } from "app/core/http/http-client.service";
import { BaseModel } from "app/core";
import { Band } from "app/main/band/models";
import { BaseResponse } from 'app/tools';

@Injectable()
export abstract class CreationService {

  public selectedEntity: EntityType;
  public baseModel: BaseModel
  public musician: Musician;

  public instrument: InstrumentType;

  abstract save(): Observable<BaseResponse>;

  abstract checkLogin(login: string): Observable<boolean>;

  constructor() {
    this.baseModel = new BaseModel();
    this.musician = new Musician();
  }


  buildEntity(): BaseModel {
    switch (this.selectedEntity) {
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
export class CreationServiceHttp extends CreationService {

  constructor(private http: HttpClient) {
    super();
  }

  save(): Observable<BaseResponse> {

    var entity = this.buildEntity();
    entity.entityType = this.selectedEntity;
    entity.location = { latitude: entity.latitude, longitude: entity.longitude };

    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/profile`, entity).map(x => BaseResponse.ToBaseResponse(x.json()));
  }

  checkLogin(login: string): Observable<boolean> {
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/check/${login}`).map(x => x.json());
  }
}
