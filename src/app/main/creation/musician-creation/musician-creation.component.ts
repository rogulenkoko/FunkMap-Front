import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from "@angular/router";
import { DateSelectProvider } from "app/tools/date/date-select-provider.service"
import { MusicianTypesProvider } from "../../musician/musician-types-provider";
import { InstrumentType, Musician, MusicStyle, Sex } from "../../musician/models";
import { IconProvider } from "../../map/icon-provider.service";
import { Dictionary } from "typescript-collections";
import { EntityType } from "../../map/models";
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
import { CreationService } from "app/main/creation/creation.service";

@Component({
  selector: 'musician-creation',
  templateUrl: './musician-creation.component.html',
  styleUrls: ['./musician-creation.component.scss','../creation.component.scss'],
  providers: [MusicianTypesProvider]
})
export class MusicianCreationComponent implements OnInit {

  @ViewChild('cropper') cropper:ImageCropperComponent;

  private currenSelectedStyle: MusicStyle = undefined;
  private styles: Dictionary<MusicStyle, string>;

  constructor(private musicianTypesProvider: MusicianTypesProvider,
              private iconProvider: IconProvider, 
              private dateProvider: DateSelectProvider,
              private creationService: CreationService,
              private router: Router) {
    this.creationService.musician = new Musician();
    this.styles = new Dictionary<MusicStyle, string>(); 
    this.musicianTypesProvider.expiriences
    this.musicianTypesProvider.musicStyles.keys().forEach(key => {
      this.styles.setValue(key, this.musicianTypesProvider.musicStyles.getValue(key));
    }); 
   
   }

  ngOnInit() {
  }

  onStyleChanged(){
    this.creationService.musician.styles.push(this.currenSelectedStyle);
    this.styles.remove(this.currenSelectedStyle);
    this.currenSelectedStyle = undefined;
  }

  removeStyle(musicianStyle:MusicStyle){
    this.creationService.musician.styles.splice(this.creationService.musician.styles.findIndex(x=> x == musicianStyle), 1);
    this.styles.setValue(musicianStyle, this.musicianTypesProvider.musicStyles.getValue(musicianStyle));
  }

  selectInstrument(instrument: InstrumentType){
    this.creationService.musician.instrument = instrument;
  }


}
