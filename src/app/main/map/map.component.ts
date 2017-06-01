import { Component, OnInit } from '@angular/core';

import { MapProvider } from "./map-provider.service";
import { Map, MapMarker } from "./models";
import { MarkerFactory } from "./marker-factory.service";

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private map: L.Map;
  private baseLayer: L.TileLayer;

  private center: MapMarker;

  private markersLayer: L.LayerGroup;

  constructor(private mapProvider: MapProvider,
    private markerFactory: MarkerFactory) {
    this.center = new MapMarker(1, 50, 30);
    this.mapProvider.onMapChange.subscribe(()=>this.updateMap());
  }

  ngOnInit() {
    this.map = new L.Map('map', { center: new L.LatLng(this.center.lat, this.center.lng), zoom: 7, zoomAnimation: false });
    this.initMap();
    this.initMarkersLayer();
  }

  private initMap() {
    
    var options = this.buildMapOptions(this.mapProvider.selectedMap);
    this.baseLayer = new L.TileLayer(this.mapProvider.selectedMap.url, options);
    this.map.addLayer(this.baseLayer);

  }

  private updateMap(){
    this.map.removeLayer(this.baseLayer);
    this.initMap();
  } 

  private initMarkersLayer() {
    this.markersLayer = L.layerGroup([]);
    this.refreshMarkers();
    this.map.addLayer(this.markersLayer);

  }

  private refreshMarkers() {
    var marker = new MapMarker(2, 51, 30);
    var cluster = this.markerFactory.getMarkerCluster([this.center, marker]);
    this.markersLayer.clearLayers();
    this.markersLayer.addLayer(cluster);
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
