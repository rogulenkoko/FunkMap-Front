import { Component, OnInit } from '@angular/core';
import { MapProvider } from "./map-provider.service";
import { Map, MapPoint } from "./models";
import { MarkerFactory } from "./marker-factory.service";

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private leafletMap: L.Map;

  private center: MapPoint;

  private markersLayer: L.LayerGroup;

  constructor(private mapProvider: MapProvider,
              private markerFactory: MarkerFactory) {
    this.center = new MapPoint(50,30);
   }

  ngOnInit() {
    this.initMap();
    this.initMarkersLayer();
  }

  private initMap(){
    this.leafletMap = new L.Map('map', { center: new L.LatLng(this.center.lat, this.center.lng), zoom: 7, zoomAnimation: false });
    var selectedMap = this.mapProvider.maps.getValue(this.mapProvider.selectedMap);
    var options = this.buildMapOptions(selectedMap);
    var osm = new L.TileLayer(selectedMap.url,options);
    this.leafletMap.addLayer(osm);
    
  }

  private initMarkersLayer(){
    this.markersLayer = L.layerGroup([]);
    this.refreshMarkers();
    this.leafletMap.addLayer(this.markersLayer);
    
  }

  private refreshMarkers(){
    var cluster = this.markerFactory.getMarkerCluster([this.center]);
    this.markersLayer.clearLayers();
    this.markersLayer.addLayer(cluster);
  }

  private buildMapOptions(map: Map): any{
    let options: any;
    if (map.subdomains.length == 0) {
      options = {
        attribution: map.attribution,
        maxZoom: map.maxZoom
      };
    }
    else {
      options = {
        attribution: map.attribution,
        maxZoom: map.maxZoom,
        subdomains: map.subdomains
      };
    }
    return options;
  }

}
