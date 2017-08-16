import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { InstrumentType, Musician, MusicStyle, Sex } from "../musician/models";
import { DateSelectProvider } from "app/tools/date/date-select-provider.service";
import { MusicianTypesProvider } from "../musician/musician-types-provider";
import { EntityType, Marker } from "../map/models";
import { CreationService } from "./creation.service";
import { EntityTypeProvider } from "app/tools/entity-type-provider.service";
import { CropperSettings, ImageCropperComponent } from "ng2-img-cropper";
import { EntityItem } from "app/tools/select";
import { TranslateService } from "@ngx-translate/core";
import { MapCreationService } from "app/main/map/map-creation.service";
import { UserService } from "app/main/user/user.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})

export class CreationComponent implements OnInit {

  @ViewChild('cropper') cropper: ImageCropperComponent;

  private data: any;
  private cropperSettings: CropperSettings;
  private isImageSaved: boolean = false;
  private isComplete: boolean;

  private entities: Array<EntityItem>;

  private subscription: Subscription;

  constructor(private creationService: CreationService,
    private router: Router,
    private route: ActivatedRoute,
    private entityTypeProvider: EntityTypeProvider,
    private translateService: TranslateService,
    private mapCreationService: MapCreationService,
    private userService: UserService) {

    this.entities = entityTypeProvider.entities.keys().map(x => new EntityItem(x, this.translateService.get(entityTypeProvider.entities.getValue(x))));

    this.creationService.selectedEntity = this.creationService.selectedEntity ? this.creationService.selectedEntity : this.entityTypeProvider.entities.keys()[0];
    this.setCropperOptions();
    this.data = {};
  }

  ngOnInit() {
    this.subscription = this.mapCreationService.onComplete.subscribe(marker => this.setCoordinates(marker));
    this.route.params.subscribe(params => {
      if (params['isComplete']) {
        this.save();
      }
    })
  }

  private save() {
    this.isComplete = true;
    this.creationService.save().subscribe(response => {
      if (response.success) {
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      }
    });

  }

  private setCoordinates(marker: Marker) {
    this.subscription.unsubscribe();
    this.creationService.baseModel.latitude = marker.lat;
    this.creationService.baseModel.longitude = marker.lng;
    this.router.navigate(['/create', { isComplete: true }]);
  }

  toMapCreation() {
    this.mapCreationService.marker = new Marker(this.creationService.baseModel.login, this.userService.latitude, this.userService.longitude, this.creationService.selectedEntity);
    if (this.creationService.selectedEntity == EntityType.Musician) {
      this.mapCreationService.marker.instrument = this.creationService.musician.instrument;
    }
    this.router.navigate(['/checkmap']);
  }

  private setCropperOptions() {
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

  private saveImage() {
    this.creationService.baseModel.avatar = this.data.image.replace("data:image/jpeg;base64,", "");
    this.isImageSaved = true;
  }

  private cancelImage() {
    this.cropper.reset();
    this.isImageSaved = false;
  }

  fileChangeListener($event) {
    this.isImageSaved = false;
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


