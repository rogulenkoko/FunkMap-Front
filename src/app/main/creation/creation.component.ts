import { Component, OnInit } from '@angular/core';
import { MapProvider } from "../map/map-provider.service";
import { Map } from "../map/models";

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit {

  private map: L.Map;
  private baseLayer: L.TileLayer;

  constructor(private mapProvider: MapProvider) { }

  ngOnInit() {
    this.map = new L.Map('map', { center: new L.LatLng(50, 30), zoom: 7, zoomAnimation: false });
    this.initMap();
  }

  private initMap() {
    
    var options = this.buildMapOptions(this.mapProvider.selectedMap);
    this.baseLayer = new L.TileLayer(this.mapProvider.selectedMap.url, options);
    this.map.addLayer(this.baseLayer);

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
