import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { InstrumentType, Musician, MusicStyle, Sex } from "../musician/models";
import { DateSelectProvider } from "app/tools/date/date-select-provider.service";
import { MusicianTypesProvider } from "../musician/musician-types-provider";
import { EntityType, Marker } from "../map/models";
import { CreationService } from "./creation.service";
import { EntityTypeProvider } from "app/tools/entity-type-provider.service";
import { CropperSettings, ImageCropperComponent } from "ng2-img-cropper";
import { EntityItem, InstrumentsItem } from "app/tools/select";
import { TranslateService } from "@ngx-translate/core";
import { MapCreationService } from "app/main/map/map-creation.service";
import { UserService } from "app/main/user/user.service";
import { Subscription } from "rxjs/Subscription";
import { RouteBuilder } from "app/tools/route-builder";

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})

export class CreationComponent implements OnInit {

  private cropperSettings: CropperSettings;
  private isImageSaved: boolean = false;

  private entities: Array<EntityItem>;
  private instruments: Array<InstrumentsItem>

  private subscription: Subscription;

  private isNameValid: boolean = true;
  private isLoginValid: boolean = true;
  private isLoginExist: boolean = false;

  constructor(private creationService: CreationService,
    private router: Router,
    private route: ActivatedRoute,
    private entityTypeProvider: EntityTypeProvider,
    private translateService: TranslateService,
    private mapCreationService: MapCreationService,
    private userService: UserService,
    private musicianTypesProvider: MusicianTypesProvider) {

    this.entities = entityTypeProvider.entities.keys().map(x => new EntityItem(x, this.translateService.get(entityTypeProvider.entities.getValue(x))));
    this.instruments = musicianTypesProvider.instruments.keys().map(x => new InstrumentsItem(x, this.translateService.get(musicianTypesProvider.instruments.getValue(x))));
    this.creationService.selectedEntity = this.creationService.selectedEntity ? this.creationService.selectedEntity : this.entityTypeProvider.entities.keys()[0];
    this.creationService.instrument = this.creationService.instrument ? this.creationService.instrument : this.musicianTypesProvider.instruments.keys()[0];
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
    this.creationService.save().subscribe(response => {
      if (response.success) {
        var route = RouteBuilder.buildRoute(this.creationService.selectedEntity, this.creationService.baseModel.login);
        this.router.navigate([route]);
      }
    });

  }

  private setCoordinates(marker: Marker) {
    this.subscription.unsubscribe();
    this.creationService.baseModel.latitude = marker.lat;
    this.creationService.baseModel.longitude = marker.lng;

    this.router.navigate(['/create', { isComplete: true }]);
  }

  private validate() {

    if (!this.creationService.baseModel.login) {
      this.isLoginValid = false;
      setTimeout(() => this.isLoginValid = true, 3000);
      return;
    }

    if (!this.creationService.baseModel.name) {
      this.isNameValid = false;
      setTimeout(() => this.isNameValid = true, 3000);
      return;
    }

    this.creationService.checkLogin(this.creationService.baseModel.login).subscribe(isExist => {
      this.isLoginExist = isExist;
      setTimeout(() => this.isLoginExist = false, 3000);
      if (!isExist) this.toMapCreation();
    })
  }

  toMapCreation() {
    this.mapCreationService.marker = new Marker(this.creationService.baseModel.login, this.userService.latitude, this.userService.longitude, this.creationService.selectedEntity);
    if (this.creationService.selectedEntity == EntityType.Musician) {
      this.mapCreationService.marker.instrument = this.creationService.instrument;
    }
    this.mapCreationService.backRoute = "/create";
    this.router.navigate(['/checkmap']);
  }

  private cancel() {
    this.mapCreationService.onCancel.emit();
    this.router.navigate(['/'])
  }
}


