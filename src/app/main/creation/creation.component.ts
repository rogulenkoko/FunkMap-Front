import { Component, OnInit } from '@angular/core';
import { InstrumentType, Musician, MusicStyle, Sex } from "../musician/models";
import { DateSelectProvider } from "app/tools/date/date-select-provider.service";
import { MusicianTypesProvider } from "../musician/musician-types-provider";

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit {

  private musician: Musician;

  constructor() {
    this.musician = new Musician("",""); //todo убрать
   }

  ngOnInit(){
    
  }

}
