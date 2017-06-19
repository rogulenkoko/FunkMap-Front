import { Injectable } from '@angular/core';
import { MusicianService } from "./musician.service";
import { Observable } from "rxjs/Observable";
import { Musician, MusicStyle, Sex, InstrumentType } from "./models";

@Injectable()
export class MusicianServiceStub extends MusicianService {

  constructor() { 
    super();
  }

   getMusician(id: string): Observable<Musician>{
     var musician = new Musician("tomson", "Мик Томсон");
     musician.styles = [MusicStyle.Funk, MusicStyle.Rock];
     musician.instrument = InstrumentType.Drums;
     musician.birthDate = new Date();
     musician.years = 45;
     musician.sex = Sex.Male;
     musician.expirience = 3;
     musician.description = `Мик Томсон (род. 3 ноября 1973 ) - американский музыкант. Он известен как один из трех гитаристов Slipknot`;
    return Observable.of(musician);
   }


}
