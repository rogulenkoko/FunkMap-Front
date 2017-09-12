import { Injectable } from '@angular/core';
import { MusicianService } from "./musician.service";
import { Observable } from "rxjs/Observable";
import { Musician, MusicStyle, Sex, InstrumentType, MusicianPreview } from "./models";
import { BaseResponse } from "app/tools";
import { EntityType } from "app/main/map/models";
import { VideoInfo, VideoType } from "app/main/video-edit/video-info";
import { BandInviteMusicianRequest } from 'app/main/musician/models/band-invite-musician-request';

@Injectable()
export class MusicianServiceStub extends MusicianService {

  constructor() { 
    super();
  }

   getMusicianPreview(id: string): Observable<MusicianPreview>{
     var musician = this.getModel();
    return Observable.of(musician);
   }

   getMusician(id: string): Observable<Musician>{
    var musician = this.getModel();
    return Observable.of(musician);
   }

   updateMusician(musician: Musician):Observable<BaseResponse>{
     return Observable.of(new BaseResponse(true));
   }

   private getModel(){
     var musician = new Musician("test1", "Мик Томсон", EntityType.Musician);
     musician.styles = [MusicStyle.Funk, MusicStyle.Rock];
     musician.instrument = InstrumentType.Drums;
     musician.birthDate = new Date();
     musician.years = 45;
     musician.sex = Sex.Male;
     musician.expirience = 3;
     musician.latitude = 30;
     musician.longitude = 40;
     musician.birthDate = new Date();
     musician.age = 23;
     musician.videoInfos = [new VideoInfo("kCsrmTxEZhE", VideoType.Youtube), new VideoInfo("59777392", VideoType.Vimeo), new VideoInfo("59777392", VideoType.Vimeo)];
     musician.facebookLink = "asd";
     musician.vkLink = "aaa";
     musician.soundCloudLink = "aaaa";
     musician.youTubeLink = "zz";
     musician.description = `Мик Томсон (род. 3 ноября 1973 ) - американский музыкант. Он известен как один из трех гитаристов Slipknot`;
     return musician;
   }

   inviteToBand(request: BandInviteMusicianRequest): Observable<BaseResponse>{
    return Observable.of(new BaseResponse(true));
  }


}
