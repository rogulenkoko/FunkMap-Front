import { Component, OnInit } from '@angular/core';
import { MusicianTypesProvider } from "../../musician/musician-types-provider";
import { InstrumentType, Musician, MusicStyle, Sex } from "../../musician/models";
import { IconProvider } from "../../map/icon-provider.service";

@Component({
  selector: 'musician-creation',
  templateUrl: './musician-creation.component.html',
  styleUrls: ['./musician-creation.component.scss','../creation.component.scss']
})
export class MusicianCreationComponent implements OnInit {

  private musician: Musician;

  constructor(private musicianTypesProvider: MusicianTypesProvider,
              private iconProvider: IconProvider) {
    this.musician = new Musician();
   }

  ngOnInit() {
  }

  save(){
    console.log(this.musician);
  }

  selectInstrument(instrument: InstrumentType){
    this.musician.instrument = instrument;
  }

}
