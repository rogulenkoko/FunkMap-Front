import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Marker, EntityType } from "./models";
import { IconProvider } from "./icon-provider.service";

@Injectable()
export class MarkerFactory {

  constructor(private router: Router, private iconProvider: IconProvider) {

  }

  public getMarker(point: Marker): L.Marker {
    point.iconUrl = this.iconProvider.getIcon(point);
    var marker = L.marker(new L.LatLng(point.lat, point.lng), {
      icon: new L.DivIcon({
        html:`
          <div class="icon-image-container d-flex align-items-center justify-content-center">
            <img src="${point.iconUrl}"/>
          </div>
        `
      })
    });
    marker.on("click", (marker) => {
      switch (point.entityType) {
        case EntityType.Musician: this.router.navigate(["/musician/" + point.login]); break;
        case EntityType.Shop: this.router.navigate(["/shop/" + point.login]); break;
        case EntityType.Band: this.router.navigate(["/band/" + point.login]); break;
      }
    })
    return marker;
  }

  public getCreationMarker(point: Marker): L.Marker{
    point.iconUrl = this.iconProvider.getIcon(point);
    var marker = L.marker(new L.LatLng(point.lat, point.lng), {
      icon: new L.DivIcon({
        html:`
          <div class="creation-marker-container">
            <div class="creation-icons-container d-flex flex-row">
              <div id="cross" class="cross-container d-flex align-items-center justify-content-center"><img id="cross-img" src="assets/images/close-red.png"/></div>
              <div id="apply" class="apply-container d-flex align-items-center justify-content-center"><img id="apply-img" src="assets/images/apply.png"/></div>
            </div>
            <img src="${point.iconUrl}"/>
          </div>
        `
      })
    });
    return marker;
  }

  public getMarkerCluster(point: Array<Marker>): L.LayerGroup {

    var cluster = L.markerClusterGroup({
      polygonOptions: {
        opacity: 0
      },
      iconCreateFunction: (cluster) => {
        return L.divIcon({
          html: `<div class="d-flex jusify-content-center align-items-center cluster-icon-container">
                    <span>${cluster.getChildCount()}</span>
                  </div>`,
          className: ""
        });
      }
    });
    cluster.addLayers(point.map(x => this.getMarker(x)));
    return cluster;
  }
}
