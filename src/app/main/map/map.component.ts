import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { MapProvider } from "./map-provider.service";
import { Map, Marker, EntityType, NearestRequest } from "./models";
import { MarkerFactory } from "./marker-factory.service";
import { MapService } from "./map.service";
import { MapFilter } from "./map-filter.service";
import { CreationService } from "../creation/creation.service";

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

  private nearestRadius = 1;
  private currentPosition: any;// Position;

  constructor(private mapProvider: MapProvider,
    private markerFactory: MarkerFactory,
    private mapService: MapService,
    private mapFilter: MapFilter,
    private creationService: CreationService,
    private router: Router) {
    this.mapProvider.onMapChange.subscribe(() => this.updateMap());
    this.mapFilter.onSearchAll.subscribe(() => {
      if (this.mapFilter.isAllShown) this.getAll();
      else this.getNearest();
    })
    this.creationService.onSelectPosition.subscribe((event) => this.selectEntityPosition(event))
  }

  ngOnInit() {
    this.map = new L.Map('map', { center: new L.LatLng(50, 30), zoom: 8, zoomAnimation: false, zoomControl: false });
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
      } else {
        this.currentPosition = { coords: { latitude: this.map.getCenter().lat, longitude: this.map.getCenter().lng } }
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

  private selectEntityPosition(marker: Marker) {
    this.clearAllLayers();
    var result = this.drawCreationMarker(marker);
    this.map.on("click", (event: any) => {
      this.clearAllLayers();
      marker.lat = event.latlng.lat;
      marker.lng = event.latlng.lng;
      result = this.drawCreationMarker(marker);
    })
  }

  private drawCreationMarker(marker: Marker): L.Marker {
    var result = this.markerFactory.getCreationMarker(marker);
    result.on("click", (event: any) => {
      if (event.originalEvent.target.id == "cross" || event.originalEvent.target.id == "cross-img") {
        this.router.navigate(['/checkmap']);
        this.clearAllLayers();
      }

      if (event.originalEvent.target.id == "apply" || event.originalEvent.target.id == "apply-img") {
        this.creationService.baseModel.latitude = event.latlng.lat;
        this.creationService.baseModel.longitude = event.latlng.lng;
        this.map.removeLayer(result);
        this.map.off("click");
        this.router.navigate(['/checkmap', { save: true }]);
      }
    })
    this.map.addLayer(result);
    return result;
  }


  private clearAllLayers() {
    this.map.eachLayer((layer) => {
      if (this.baseLayer != layer) {
        layer.remove();
      }
    });
  }
}
