import { Injectable } from '@angular/core';
import { Http } from "@angular/http"
import { Observable } from "rxjs/Observable";
import { Musician, MusicStyle, MusicianPreview, MusicianFilter } from "./models";
import { ConfigurationProvider, ServiceType } from "app/core/configuration/configuration-provider";
import { SearchItem } from "app/main/search/search-item";
import { BaseResponse } from "app/tools";
import { HttpClient } from "app/core/http/http-client.service";
import { EntityType } from "app/main/map/models";
import { BandInviteMusicianRequest, BandInviteInfoRequest, BandInviteInfo } from 'app/main/musician/models/band-invite-musician-request';
import { InviteBandResponse } from 'app/main/musician/invite-band-response';
import { LeaveBandRequest } from 'app/main/band/models/leave-band-request';

@Injectable()
export abstract class MusicianService {

  constructor() { }

  abstract getMusicianPreview(id: string): Observable<MusicianPreview>;

  abstract getMusician(id: string): Observable<Musician>;

  abstract updateMusician(musician: Musician):Observable<BaseResponse>;

  abstract inviteToBand(request: BandInviteMusicianRequest): Observable<InviteBandResponse>;

  abstract getInviteBandInfo(request: BandInviteInfoRequest): Observable<BandInviteInfo>;

  abstract leaveBand(request: LeaveBandRequest): Observable<BaseResponse>;

}

@Injectable()
export class MusicianServiceHttp extends MusicianService {

  constructor(private http: HttpClient) {
    super();
   }


   getMusicianPreview(id: string): Observable<MusicianPreview>{
     return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}musician/get/${id}`).map(x=>MusicianPreview.ToMusicianPreview(x.json()));
   }

   getMusician(id: string): Observable<Musician>{
     return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}musician/getFull/${id}`).map(x=>Musician.ToMusician(x.json()));
   }

   updateMusician(musician: Musician):Observable<BaseResponse>{
     musician.entityType = EntityType.Musician;
     return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/update`, musician).map(x=> BaseResponse.ToBaseResponse(x.json()));
   }

   inviteToBand(request: BandInviteMusicianRequest): Observable<InviteBandResponse>{
     return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}musician/invite`, request).map(x=> InviteBandResponse.ToInviteBandResponse(x.json()));;
   }

   getInviteBandInfo(request: BandInviteInfoRequest): Observable<BandInviteInfo>{
     return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}band/getInviteInfo`, request).map(x=> BandInviteInfo.ToBandInviteInfo(x.json()));
   }

   leaveBand(request: LeaveBandRequest): Observable<BaseResponse>{
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}musician/leaveBand`, request).map(x=> BaseResponse.ToBaseResponse(x.json()));
   }

}
