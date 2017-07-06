import { Injectable } from '@angular/core';
import { BandService } from "./band.service";
import { Observable } from "rxjs/Observable";
import { BandPreview } from "./models";
import { InstrumentType, Musician } from "../musician/models"

@Injectable()
export class BandServiceStub extends BandService {

  constructor() {
    super();
   }

   getBand(id: string): Observable<BandPreview>{
     var band = new BandPreview("beatles","The Beatles");
     band.desiredInstruments = [InstrumentType.Bass, InstrumentType.Drums];
     band.musicians = [
       "test",
       "rogulenkoko"
     ];
     return Observable.of(band);
   }

}
