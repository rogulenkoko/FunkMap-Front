import { Component, OnInit } from '@angular/core';
import { MapProvider } from "../../map/map-provider.service";
import { Map, Marker, EntityType } from "../../map/models";
import { IconProvider } from "../../map/icon-provider.service";
import { MarkerFactory } from "../../map/marker-factory.service";
import { CreationService } from "../creation.service";
import { Router, Params, ActivatedRoute } from "@angular/router";
import { CreationResponse } from "../creation";

@Component({
  selector: 'app-map-creation',
  templateUrl: './map-creation.component.html',
  styleUrls: ['./map-creation.component.scss']
})
export class MapCreationComponent implements OnInit {

  private isNotToSave: boolean;

  constructor(private mapProvider: MapProvider,
    private creationService: CreationService,
    private iconProvider: IconProvider,
    private markerFactory: MarkerFactory,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.isNotToSave = true;
    this.route.params.subscribe(params =>{
      if(params["save"]){
        this.isNotToSave = false;
        this.save();
      }
    });
  }

  useCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.creationService.baseModel.latitude = position.coords.latitude;
      this.creationService.baseModel.longitude = position.coords.longitude;
      this.save();
    })
  }

  useCustomPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      var marker = new Marker(this.creationService.baseModel.login, position.coords.latitude, position.coords.longitude, this.creationService.selectedEntity);
      if(this.creationService.selectedEntity == EntityType.Musician){
        marker.instrument = this.creationService.musician.instrument;
      }
      this.creationService.onSelectPosition.emit(marker);
      this.router.navigate(['/']);
    })

  }

  save() {
    if (!this.creationService.baseModel) {
      return;
    }
    this.creationService.save().subscribe(response => this.onSaved(response))
  }

  private onSaved(response: CreationResponse) {
    if (response.success) {
      this.router.navigate(["/success"]);
    } else {
      alert("Ошибка сохранения");
    }
  }
}
