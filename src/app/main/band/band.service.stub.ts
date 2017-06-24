import { Injectable } from '@angular/core';
import { BandService } from "./band.service";
import { Observable } from "rxjs/Observable";
import { Band } from "./band";
import { InstrumentType, Musician } from "../musician/models"

@Injectable()
export class BandServiceStub extends BandService {

  constructor() {
    super();
   }

   getBand(id: string): Observable<Band>{
     var band = new Band("beatles","The Beatles");
     band.desiredInstruments = [InstrumentType.Bass, InstrumentType.Drums];
     band.showPrice = 500;
     band.musicians = [
       "test",
       "rogulenkoko"
     ];
     return Observable.of(band);
   }

}
