import { Injectable } from '@angular/core';
import { InstrumentType, Musician, MusicStyle, Sex } from "../musician/models";
import { EntityType } from "../map/models";
import { Http } from "@angular/http"
import { Observable } from "rxjs/Observable";
import { CreationResponse } from "./creation";
import { UserService } from "../user/user.service";
import { ConfigurationProvider } from "app/core/configuration/configuration-provider";
import { HttpClient } from "app/core/http/http-client.service";

@Injectable()
export abstract class CreationService {

  public selectedEntity: EntityType;

  public musician: Musician;

  abstract saveMusician():Observable<CreationResponse>;

  constructor() { }

}

@Injectable()
export class CreationServiceHttp extends CreationService{

  constructor(private http: HttpClient, private userService: UserService) { 
    super();
  }

  saveMusician():Observable<CreationResponse>{
    this.musician.login = this.userService.user.login;
    return this.http.post(`${ConfigurationProvider.apiUrl}musician/save`,this.musician).map(x=>CreationResponse.ToCreationResponse(x.json()));
  }

}
