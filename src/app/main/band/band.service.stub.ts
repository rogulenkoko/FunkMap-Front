import { Injectable } from '@angular/core';
import { BandService } from "./band.service";
import { Observable } from "rxjs/Observable";
import { BandPreview } from "./models";
import { InstrumentType, Musician, MusicStyle } from "../musician/models"
import { BaseResponse } from "app/tools";
import { Band } from "app/main/band/models/band";
import { EntityType } from "app/main/map/models";

@Injectable()
export class BandServiceStub extends BandService {

  constructor() {
    super();
   }

   getBandPreview(id: string): Observable<BandPreview>{
     var band = new BandPreview("test","The Beatles", EntityType.Band);
     band.desiredInstruments = [InstrumentType.Bass, InstrumentType.Drums];

    band.userLogin = "test";
    band.soundCloudLink = "aaaa";
    band.youTubeLink = "xxx";

     band.musicians = [
       "test",
       "rogulenkoko"
     ];
     return Observable.of(band);
   }

   updateBand(band:Band): Observable<BaseResponse>{
     return Observable.of(new BaseResponse(true));
   }

   getBand(login: string): Observable<Band>{
     var band = new Band("test","The Beatles", EntityType.Band);
     band.desiredInstruments = [InstrumentType.Bass, InstrumentType.Drums];

    band.userLogin = "test";
    band.soundCloudLink = "aaaa";
    band.youTubeLink = "xxx";
    band.latitude = 20;
    band.longitude = 30;
    band.styles = [MusicStyle.Funk, MusicStyle.HipHop];
    band.description = "Ура! Группа!";

     band.musicians = [
       "test",
       "rogulenkoko"
     ];
     return Observable.of(band);
   }


}
