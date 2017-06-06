import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DateSelectProvider } from "app/tools/date/date-select-provider.service"
import { MusicianTypesProvider } from "../../musician/musician-types-provider";
import { InstrumentType, Musician, MusicStyle, Sex } from "../../musician/models";
import { IconProvider } from "../../map/icon-provider.service";
import { Dictionary } from "typescript-collections";
import { EntityType } from "../../map/models";
import { CreationService } from "../creation.service";

@Component({
  selector: 'musician-creation',
  templateUrl: './musician-creation.component.html',
  styleUrls: ['./musician-creation.component.scss','../creation.component.scss'],
  providers: [MusicianTypesProvider]
})
export class MusicianCreationComponent implements OnInit {

  private musician: Musician;

  private currenSelectedStyle: MusicStyle = undefined;
  private styles: Dictionary<MusicStyle, string>;

  private wasSubmit: boolean;

  constructor(private musicianTypesProvider: MusicianTypesProvider,
              private iconProvider: IconProvider, 
              private dateProvider: DateSelectProvider,
              private creationService: CreationService,
              private router: Router) {
    this.musician = new Musician();
    this.styles = new Dictionary<MusicStyle, string>(); 
    this.musicianTypesProvider.musicStyles.keys().forEach(key => {
      this.styles.setValue(key, this.musicianTypesProvider.musicStyles.getValue(key));
    }); 
    this.creationService.selectedEntity = EntityType.Musician;
   }

  ngOnInit() {
  }

  save(){

    if(!this.musician.name || !this.musician.instrument){
      this.wasSubmit = true;
      setTimeout(()=>{
        this.wasSubmit = false;
      }, 2000);
      return;
    }

    this.musician.birthDate = this.dateProvider.buildDate();
    this.creationService.musician = this.musician;
    this.router.navigate(["/create/map"]);
  }

  onStyleChanged(){
    this.musician.styles.push(this.currenSelectedStyle);
    this.styles.remove(this.currenSelectedStyle);
    this.currenSelectedStyle = undefined;
  }

  removeStyle(musicianStyle:MusicStyle){
    this.musician.styles.splice(this.musician.styles.findIndex(x=> x == musicianStyle), 1);
    this.styles.setValue(musicianStyle, this.musicianTypesProvider.musicStyles.getValue(musicianStyle));
  }

  selectInstrument(instrument: InstrumentType){
    this.musician.instrument = instrument;
  }


}
