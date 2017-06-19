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
    this.map = new L.Map('map', { center: new L.LatLng(50, 30), zoom: 7, zoomAnimation: false });
    this.initMap();
  }

  save(){
    if(!this.creationService.musician || !this.creationService.musician.latitude || !this.creationService.musician.longitude){
      return;
    }

    switch(this.creationService.selectedEntity){
      case EntityType.Musician:
        this.creationService.saveMusician().subscribe(response=>this.onSaved(response))
      break;
    }
    

  }

  private onSaved(response: CreationResponse){
    if(response.success){
      this.router.navigate(["/"]);
    } else {
      alert("Ошибка сохранения");
    }
  }

  private initMap() {
    
    var options = this.buildMapOptions(this.mapProvider.selectedMap);
    this.baseLayer = new L.TileLayer(this.mapProvider.selectedMap.url, options);
    this.map.addLayer(this.baseLayer);
    this.markersLayer = L.layerGroup([]);
    this.map.addLayer(this.markersLayer);

    this.map.on("click",(event:any)=>this.onMapClicked(event));
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

  private buildMapOptions(map: Map): any {
    let options: any;
    if (map.subdomains.length == 0) {
      options = {
        attribution: map.attribution,
        maxZoom: map.maxZoom,
        minZoom: 3
      };
    }
    else {
      options = {
        attribution: map.attribution,
        maxZoom: map.maxZoom,
        subdomains: map.subdomains,
        minZoom: 3
      };
    }
    return options;
  }

}
