import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { MapProvider } from "./map-provider.service";
import { Map, Marker, EntityType, NearestRequest } from "./models";
import { MarkerFactory } from "./marker-factory.service";
import { MapService } from "./map.service";
import { MapFilter } from "./map-filter.service";
import { CreationService } from "../creation/creation.service";
import { UserService } from "app/main/user/user.service";
import { MapCreationService } from "app/main/map/map-creation.service";
import { ConfigurationProvider } from 'app/core';
import { MapBuilder, MapThemeType } from 'app/main/map/map-builder.service';
import { SearchFilterService } from 'app/main/search/search-filter/search-filter.service';

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



  constructor(private mapBuilder: MapBuilder,
    private markerFactory: MarkerFactory,
    private mapService: MapService,
    private mapFilter: MapFilter,
    private creationService: CreationService,
    private router: Router,
    public userService: UserService,
    private mapCreationService: MapCreationService,
    private searchFilterService: SearchFilterService) {
    this.mapCreationService.onSelectPosition.subscribe((event) => this.selectEntityPosition(event));
    this.mapFilter.onOutItemsSelected.subscribe((marker) => this.selectMarker(marker));

    this.searchFilterService.onFilterChanged.subscribe(() => this.getFilteredMarkers());
    this.mapCreationService.onCancel.subscribe(() => this.map.off("click"));
  }

  ngOnInit() {

   
    var lastMarker = this.userService.getLastCoordinates();
    var latLng = lastMarker ? lastMarker : new L.LatLng(50, 30);

    var buildResult = this.mapBuilder.buildMap("map", latLng, 10, MapThemeType.Dark);
    this.map = buildResult.map;
    this.baseLayer = buildResult.mainLayer;
    this.initMarkersLayer();
  }



  private updateMap() {
    this.map.removeLayer(this.baseLayer);
  }

  private initMarkersLayer() {
    this.markersLayer = L.layerGroup([]);
    this.map.addLayer(this.markersLayer);
    var lastMarker = this.userService.getLastCoordinates();
    var latLng = lastMarker ? lastMarker : new L.LatLng(this.userService.latitude, this.userService.longitude);

    this.map.setView(latLng, this.map.getZoom());
    this.getNearest();
  }

  private getNearest() {
    var request = new NearestRequest(this.userService.latitude, this.userService.longitude, ConfigurationProvider.entitiesLimit);
    this.mapService.getNearest(request).subscribe(markers => {
      this.markers = markers;
      this.refreshMarkers();
    });
  }

  private getFilteredMarkers() {

    this.mapService.getFiltered().subscribe(markers => {
      this.markers = markers;
      this.refreshMarkers();
    })
  }

  private refreshMarkers() {
    if (!this.map.hasLayer(this.markersLayer)) {
      this.map.addLayer(this.markersLayer);
    }
    var cluster = this.markerFactory.getMarkerCluster(this.markers);
    this.markersLayer.clearLayers();
    this.markersLayer.addLayer(cluster);
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
        this.mapCreationService.marker.lat = event.latlng.lat;
        this.mapCreationService.marker.lng = event.latlng.lng;
        this.map.removeLayer(result);
        this.map.off("click");

        this.mapCreationService.onComplete.emit(this.mapCreationService.marker);
      }
    })
    this.map.addLayer(result);
    return result;
  }

  private selectMarker(point: Marker) {
    var markerBounds = L.latLngBounds([[point.lat, point.lng]]);
    this.map.fitBounds(markerBounds);
    this.map.zoomOut(4)
  }

  private zoom(value: number) {
    this.map.setZoom(this.map.getZoom() + value);
  }

  private clearAllLayers() {
    this.map.eachLayer((layer) => {
      if (this.baseLayer != layer) {
        layer.remove();
      }
    });
  }
}
