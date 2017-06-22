import { Component, OnInit } from '@angular/core';
import { MapProvider } from "../../map/map-provider.service";
import { Map, Marker, EntityType } from "../../map/models";
import { IconProvider } from "../../map/icon-provider.service";
import { MarkerFactory } from "../../map/marker-factory.service";
import { CreationService } from "../creation.service";
import { Router } from "@angular/router";
import { CreationResponse } from "../creation";

@Component({
  selector: 'app-map-creation',
  templateUrl: './map-creation.component.html',
  styleUrls: ['./map-creation.component.scss']
})
export class MapCreationComponent implements OnInit {

  private map: L.Map;
  private baseLayer: L.TileLayer;

  private markersLayer: L.LayerGroup;

  constructor(private mapProvider: MapProvider,
              private creationService: CreationService,
              private iconProvider: IconProvider,
              private markerFactory: MarkerFactory,
              private router: Router) { }

  ngOnInit() {
  }

  useCurrentPosition(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.creationService.baseModel.latitude = position.coords.latitude;
      this.creationService.baseModel.longitude = position.coords.longitude;
      this.save();
    })
  }

  save(){
    if(!this.creationService.musician || !this.creationService.musician.latitude || !this.creationService.musician.longitude){
      return;
    }
    this.creationService.save().subscribe(response=>this.onSaved(response))
  }

  private onSaved(response: CreationResponse){
    if(response.success){
      this.router.navigate(["/"]);
    } else {
      alert("Ошибка сохранения");
    }
  }

  

  private onMapClicked(event:any){
    
    var marker = new Marker("", event.latlng.lat, event.latlng.lng, this.creationService.selectedEntity);//todo вместо пустой строки значение от поля логин
    switch(this.creationService.selectedEntity){
      case EntityType.Musician:
        marker.instrument = this.creationService.musician.instrument;
        this.creationService.musician.longitude = marker.lng;
        this.creationService.musician.latitude = marker.lat;
        break;
    }
    marker.iconUrl = this.iconProvider.getIcon(marker);
    var mapMarker = this.markerFactory.getMarker(marker);
    this.markersLayer.clearLayers();
    this.markersLayer.addLayer(mapMarker);
  }
}
