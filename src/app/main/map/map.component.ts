import { Component, OnInit } from '@angular/core';

import { MapProvider } from "./map-provider.service";
import { Map, Marker, EntityType, NearestRequest } from "./models";
import { MarkerFactory } from "./marker-factory.service";
import { MapService } from "./map.service";
import { MapFilter } from "./map-filter.service";

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private map: L.Map;
  private baseLayer: L.TileLayer;

  private center: Marker;

  private markersLayer: L.LayerGroup;

  private markers: Array<Marker>;

  private nearestRadius = 20;
  private currentPosition: Position;

  constructor(private mapProvider: MapProvider,
    private markerFactory: MarkerFactory,
    private mapService: MapService,
    private mapFilter: MapFilter) {
    this.mapProvider.onMapChange.subscribe(() => this.updateMap());
    this.mapFilter.onSearchAll.subscribe(() => {
      if (this.mapFilter.isAllShown) this.getAll();
      else this.getNearest();
    })
  }

  ngOnInit() {
    this.map = new L.Map('map', { center: new L.LatLng(50, 30), zoom: 8, zoomAnimation: false });
    this.initMap();
    this.initMarkersLayer();
  }

  private initMap() {

    var options = this.buildMapOptions(this.mapProvider.selectedMap);
    this.baseLayer = new L.TileLayer(this.mapProvider.selectedMap.url, options);
    this.map.addLayer(this.baseLayer);

  }

  private updateMap() {
    this.map.removeLayer(this.baseLayer);
    this.initMap();
  }

  private initMarkersLayer() {
    this.markersLayer = L.layerGroup([]);
    this.map.addLayer(this.markersLayer);
    var location = navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        this.currentPosition = position;
        this.map.setView(new L.LatLng(position.coords.latitude, this.currentPosition.coords.longitude), this.map.getZoom());
      }
      this.getNearest();
    });

  }

  private getAll() {
    this.mapService.getAll().subscribe(markers => {
      this.markers = markers;

      this.refreshMarkers();
    });
  }

  private getNearest() {
    var request = new NearestRequest(this.currentPosition.coords.latitude, this.currentPosition.coords.longitude, this.nearestRadius);
    this.mapService.getNearest(request).subscribe(markers => {
      this.markers = markers;
      console.log(markers);
      this.refreshMarkers();
    });
  }

  private refreshMarkers() {
    var cluster = this.markerFactory.getMarkerCluster(this.markers);
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
