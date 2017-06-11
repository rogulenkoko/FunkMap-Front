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
      icon: new L.Icon({
        iconUrl: point.iconUrl,
        className: "icon-image-container"
      })
    });
    marker.on("click", (marker) => {
      switch (point.entityType) {
        case EntityType.Musician: this.router.navigate(["/musician/" + point.id]); break;
        case EntityType.Shop: this.router.navigate(["/shop/" + point.id]); break;
        case EntityType.Band: this.router.navigate(["/band/"+point.id]); break;
      }
    })
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
