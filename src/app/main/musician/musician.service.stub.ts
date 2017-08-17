import { Injectable } from '@angular/core';
import { MusicianService } from "./musician.service";
import { Observable } from "rxjs/Observable";
import { Musician, MusicStyle, Sex, InstrumentType, MusicianPreview } from "./models";
import { BaseResponse } from "app/tools";

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
     var musician = new Musician("test", "Мик Томсон");
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
     musician.videosYoutube = ["kCsrmTxEZhE", "sRStoXuNDII"];
     musician.facebookLink = "asd";
     musician.vkLink = "aaa";
     musician.soundCloudLink = "aaaa";
     musician.youTubeLink = "zz";
     musician.description = `Мик Томсон (род. 3 ноября 1973 ) - американский музыкант. Он известен как один из трех гитаристов Slipknot`;
     return musician;
   }


}
