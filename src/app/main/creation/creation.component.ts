import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { InstrumentType, Musician, MusicStyle, Sex } from "../musician/models";
import { DateSelectProvider } from "app/tools/date/date-select-provider.service";
import { MusicianTypesProvider } from "../musician/musician-types-provider";
import { EntityType } from "../map/models";
import { CreationService } from "./creation.service";
import { Entity } from "app/tools/models/entity";
import { EntityTypeProvider } from "app/tools/entity-type-provider.service";
import { CropperSettings, ImageCropperComponent } from "ng2-img-cropper";

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})

export class CreationComponent implements OnInit {

  @ViewChild('cropper') cropper:ImageCropperComponent;

  private data: any;
  private cropperSettings: CropperSettings;
  private isSaved: boolean = false;

  constructor(private creationService: CreationService,
              private router: Router,
              private entityTypeProvider: EntityTypeProvider) {
    
    this.creationService.selectedEntity = this.entityTypeProvider.availableEntities[0];
    this.setCropperOptions();
    this.data = {};
   }

  ngOnInit(){
  }

  save(){
    this.router.navigate(['/checkmap']);
  }

  private setCropperOptions(){
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 300;
    this.cropperSettings.croppedHeight = 300;
    this.cropperSettings.canvasWidth = 200;
    this.cropperSettings.canvasHeight = 200;
    this.cropperSettings.rounded = true;
    this.cropperSettings.noFileInput = true;
  }

  private saveImage(){
    this.creationService.baseModel.avatar = this.data.image.replace("data:image/jpeg;base64,","");
    this.isSaved = true;
  }

  private cancelImage(){
    this.cropper.reset();
    this.isSaved = false;
  }

  fileChangeListener($event) {
    this.isSaved = false;
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
  }
}


