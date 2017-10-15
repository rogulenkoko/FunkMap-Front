import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapProvider } from "app/main/map/map-provider.service";
import { Map, Marker, EntityType } from "app/main/map/models"
import { BaseModel } from "app/core";
import { MarkerFactory } from "app/main/map/marker-factory.service";
import { MapService } from "app/main/map/map.service";
import { EditableCard } from "app/tools/entity-full/editable-card";
import { UserService } from "app/main/user/user.service";
import { UserDataService } from "app/main/user/user-data.service";
import { MapCreationService } from "app/main/map/map-creation.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { MusicianService } from "app/main/musician/musician.service";
import { Musician } from "app/main/musician/models";
import { EditService } from "app/tools/entity-full/edit.service";
import { RouteBuilder } from "app/tools/route-builder";

@Component({
  selector: 'entity-map',
  templateUrl: './entity-map.component.html',
  styleUrls: ['./entity-map.component.scss']
})
export class EntityMapComponent extends EditableCard implements OnInit {

  @Input() marker: Marker;
  @Input() height: string;

  private newMarker: Marker;

  private address: string;

  private map: L.Map;
  private baseLayer: L.TileLayer;
  private markersLayer: L.LayerGroup;
  private subscription: Subscription;

  constructor(private mapProvider: MapProvider,
              private markerFactory: MarkerFactory,
              private mapCreationService: MapCreationService,
              private mapService: MapService,
              private router: Router,
              private route: ActivatedRoute,
              private editService: EditService) {
    super();
    this.onEditModeEnabled.subscribe(() => this.toMapCreation());
    this.onSaved.subscribe(() => this.saveLocation());
    this.onCanceled.subscribe(() => this.cancelChanges());

  }

  ngOnInit() {
    this.isUsers = this.editService.isUsers;
    this.initMap(this.marker);
    this.route.params.subscribe(params => {
      this.onParamsLoaded(params);
    });
  }

  private onParamsLoaded(params) {
    if (params['isComplete']) {
      if(!this.mapCreationService.marker) return;
      this.newMarker = new Marker(this.marker.login, this.mapCreationService.marker.lat, this.mapCreationService.marker.lng, this.marker.entityType);
      if (this.newMarker.entityType == EntityType.Musician) {
        this.newMarker.instrument = this.marker.instrument;
      }
      this.initMap(this.newMarker);

      this.editService.baseModel.latitude = this.newMarker.lat;
      this.editService.baseModel.longitude = this.newMarker.lng;

      this.isEditMode = true;
    }

  }

  public initMap(mainMarker: Marker) {
    if(!mainMarker) return;
    if (this.map) this.map.remove();
    this.map = new L.Map('map-mini', { center: new L.LatLng(mainMarker.lat, mainMarker.lng), zoom: 8, zoomAnimation: false, zoomControl: false });

    var options = this.buildMapOptions(this.mapProvider.selectedMap);
    this.baseLayer = new L.TileLayer(this.mapProvider.selectedMap.url, options);
    this.map.addLayer(this.baseLayer);

    this.markersLayer = L.layerGroup([]);
    this.map.addLayer(this.markersLayer);
    var marker = this.markerFactory.getMarker(mainMarker);

    this.markersLayer.addLayer(marker);

    this.getAddress(mainMarker.lat, mainMarker.lng);
  }
  
  private saveLocation() {
    this.isEditMode = false;
    this.router.navigate([RouteBuilder.buildRoute(this.marker.entityType, this.marker.login)]);
  }

  private cancelChanges() {
    this.initMap(this.marker);
    this.newMarker = undefined;
    this.router.navigate([RouteBuilder.buildRoute(this.marker.entityType, this.marker.login)]);
  }

  private onLocationChosen(marker: Marker) {
    this.subscription.unsubscribe();

    this.router.navigate([RouteBuilder.buildRoute(marker.entityType, marker.login), { isComplete: true }]);
  }

  private toMapCreation() {
    this.subscription = this.mapCreationService.onComplete.subscribe((marker) => this.onLocationChosen(marker));
    this.mapCreationService.marker = this.marker;
    this.mapCreationService.backRoute = RouteBuilder.buildRoute(this.marker.entityType, this.marker.login);
    this.router.navigate(['/checkmap']);
  
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

  private getAddress(lat: number, lon: number) {
    this.mapService.getAddress(lat, lon).subscribe(address => {
      this.address = address;
    })
  }

}
