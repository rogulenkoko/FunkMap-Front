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

   getBand(id: number): Observable<Band>{
     var band = new Band(1,"The Beatles",51,31);
     band.desiredInstruments = [InstrumentType.Bass, InstrumentType.Drums];
     band.showPrice = 500;
     band.musicians = [
       new Musician(1, "test"),
       new Musician(2, "rogulenkoko")
     ];
     return Observable.of(band);
   }

}
