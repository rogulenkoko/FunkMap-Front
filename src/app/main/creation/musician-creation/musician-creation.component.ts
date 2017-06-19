import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { DateSelectProvider } from "app/tools/date/date-select-provider.service"
import { MusicianTypesProvider } from "../../musician/musician-types-provider";
import { InstrumentType, Musician, MusicStyle, Sex } from "../../musician/models";
import { IconProvider } from "../../map/icon-provider.service";
import { Dictionary } from "typescript-collections";
import { EntityType } from "../../map/models";
import { CreationService } from "../creation.service";
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';

@Component({
  selector: 'musician-creation',
  templateUrl: './musician-creation.component.html',
  styleUrls: ['./musician-creation.component.scss','../creation.component.scss'],
  providers: [MusicianTypesProvider]
})
export class MusicianCreationComponent implements OnInit {

  @ViewChild('cropper') cropper:ImageCropperComponent;
  private musician: Musician;

  private currenSelectedStyle: MusicStyle = undefined;
  private styles: Dictionary<MusicStyle, string>;

  private wasSubmit: boolean;


  data: any;
  cropperSettings: CropperSettings;

  constructor(private musicianTypesProvider: MusicianTypesProvider,
              private iconProvider: IconProvider, 
              private dateProvider: DateSelectProvider,
              private creationService: CreationService,
              private router: Router) {
    this.musician = new Musician("","");
    this.styles = new Dictionary<MusicStyle, string>(); 
    this.musicianTypesProvider.musicStyles.keys().forEach(key => {
      this.styles.setValue(key, this.musicianTypesProvider.musicStyles.getValue(key));
    }); 
    this.creationService.selectedEntity = EntityType.Musician;

    this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 100;
        this.cropperSettings.height = 100;
        this.cropperSettings.croppedWidth =200;
        this.cropperSettings.croppedHeight = 200;
        this.cropperSettings.canvasWidth = 400;
        this.cropperSettings.canvasHeight = 300;
        this.cropperSettings.rounded = true;
        this.cropperSettings.noFileInput = true;

        this.data = {};
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
    if(this.data.image){  
      this.musician.avatar = this.data.image.replace("data:image/jpeg;base64,","");
    }
    
    this.musician.birthDate = this.dateProvider.buildDate();
    this.creationService.musician = this.musician;
    this.router.navigate(["/create/map"]);
  }

  fileChangeListener($event) {
        var image:any = new Image();
        var file:File = $event.target.files[0];
        var myReader:FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent:any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };

        myReader.readAsDataURL(file);
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
