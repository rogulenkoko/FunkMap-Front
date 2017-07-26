import { Component, OnInit, Input } from '@angular/core';
import { MapProvider } from "app/main/map/map-provider.service";
import { Map, Marker } from "app/main/map/models"
import { BaseModel } from "app/core";
import { MarkerFactory } from "app/main/map/marker-factory.service";

@Component({
  selector: 'entity-map',
  templateUrl: './entity-map.component.html',
  styleUrls: ['./entity-map.component.scss']
})
export class EntityMapComponent implements OnInit {

  @Input() marker: Marker;

  private map: L.Map;
  private baseLayer: L.TileLayer;
  private markersLayer: L.LayerGroup;

  constructor(private mapProvider: MapProvider,
              private markerFactory: MarkerFactory) { }

  ngOnInit() {
    this.map = new L.Map('map-mini', { center: new L.LatLng(this.marker.lat, this.marker.lng), zoom: 8, zoomAnimation: false, zoomControl: false });
    this.initMap();
    this.initMarkersLayer();
  }

  private initMap() {

    var options = this.buildMapOptions(this.mapProvider.selectedMap);
    this.baseLayer = new L.TileLayer(this.mapProvider.selectedMap.url, options);
    this.map.addLayer(this.baseLayer);

  }

  private initMarkersLayer() {
    this.markersLayer = L.layerGroup([]);
    this.map.addLayer(this.markersLayer);
    var marker = this.markerFactory.getMarker(this.marker);
    this.markersLayer.addLayer(marker);
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
