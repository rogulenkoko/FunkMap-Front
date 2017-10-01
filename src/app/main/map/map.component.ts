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

  constructor(private mapProvider: MapProvider,
              private markerFactory: MarkerFactory,
              private mapService: MapService,
              private mapFilter: MapFilter,
              private creationService: CreationService,
              private router: Router,
              private userService: UserService,
              private mapCreationService: MapCreationService) {
    this.mapProvider.onMapChange.subscribe(() => this.updateMap());
    this.mapFilter.onSearchAll.subscribe(() => {
      this.getNearest();
    })
    this.mapCreationService.onSelectPosition.subscribe((event) => this.selectEntityPosition(event));
    this.mapFilter.onOutItemsSelected.subscribe((marker) => this.selectMarker(marker));

    this.mapFilter.onItemsFiltered.subscribe(logins => this.getSpecific(logins));
    this.mapCreationService.onCancel.subscribe(() => this.map.off("click"));
  }

  ngOnInit() {
    this.map = new L.Map('map', { center: new L.LatLng(50, 30), zoom: 8, zoomAnimation: false });//, zoomControl: false
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
    if (document.location.protocol == "https:") {
      var location = navigator.geolocation.getCurrentPosition((position) => {
        this.setCoordinates(position.coords.latitude, position.coords.longitude);
      });
    } else {
      this.mapService.getLocation().subscribe(location=>{
        this.setCoordinates(location.lat, location.lng);
      });
    }
  }

  private setCoordinates(lat: number, lng: number) {
    this.userService.latitude = lat;
    this.userService.longitude = lng;
    this.map.setView(new L.LatLng(lat, lng), this.map.getZoom());
    this.getNearest();
  }

  // private getAll() {
  //   this.mapService.getAll().subscribe(markers => {
  //     this.markers = markers;

  //     this.refreshMarkers();
  //   });
  // }

  private getNearest() {
    var request = new NearestRequest(this.userService.latitude, this.userService.longitude, ConfigurationProvider.entitiesLimit);
    this.mapService.getNearest(request).subscribe(markers => {
      this.markers = markers;
      this.refreshMarkers();
    });
  }

  private getSpecific(logins: Array<string>) {
    this.mapService.getSpecific(logins).subscribe(markers => {
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


  private clearAllLayers() {
    this.map.eachLayer((layer) => {
      if (this.baseLayer != layer) {
        layer.remove();
      }
    });
  }
}
