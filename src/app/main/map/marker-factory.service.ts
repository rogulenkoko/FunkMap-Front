import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Marker, EntityType } from "./models";
import { IconProvider } from "./icon-provider.service";
import { UserService } from 'app/main/user/user.service';

@Injectable()
export class MarkerFactory {

  constructor(private router: Router, private iconProvider: IconProvider, private userService: UserService) {

  }

  public getMarker(point: Marker): L.Marker {
    point.iconUrl = this.iconProvider.getIcon(point);

    var marker = L.marker(new L.LatLng(point.lat, point.lng), <any>{
      login: point.login,
      icon: new L.DivIcon({
        html: `
          <div class="main-icon-image-container">
            <div class="icon-image-container d-flex align-items-center justify-content-center">
              <img src="${point.iconUrl}"/>
            </div>
          </div>
        `
      })
    });
    marker.on("click", (marker) => {

      var latLng = new L.LatLng(point.lat, point.lng);
      this.userService.setLastCoordinates(latLng);

      switch (point.entityType) {
        case EntityType.Musician: this.router.navigate(["/musician/" + point.login]); break;
        case EntityType.Shop: this.router.navigate(["/shop/" + point.login]); break;
        case EntityType.Band: this.router.navigate(["/band/" + point.login]); break;
        case EntityType.RehearsalPoint: this.router.navigate(["/rehearsal/" + point.login]); break;
        case EntityType.Studio: this.router.navigate(["/studio/" + point.login]); break;
      }
    })
    return marker;
  }

  public getCreationMarker(point: Marker): L.Marker {
    point.iconUrl = this.iconProvider.getIcon(point);
    var marker = L.marker(new L.LatLng(point.lat, point.lng), {
      icon: new L.DivIcon({
        html: `
        <div class="main-creation-marker-container">
            <div class="creation-icons-container d-flex flex-row">
              <div id="cross" class="cross-container d-flex align-items-center justify-content-center"><img id="cross-img" src="assets/images/close-red.png"/></div>
              <div id="apply" class="apply-container d-flex align-items-center justify-content-center"><img id="apply-img" src="assets/images/apply.png"/></div>
            </div>
            <div class="creation-marker-container d-flex align-items-center justify-content-center">
              
              <img src="${point.iconUrl}"/>
            </div>
          </div>
        `
      })
    });
    return marker;
  }

  public getMarkerCluster(point: Array<Marker>): L.LayerGroup {

    var cluster = L.markerClusterGroup({
      animate: true,
      animateAddingMarkers: true,
      
      polygonOptions: {
        opacity: 0.4,
        color: "#e13dff",
        
        fillColor: "#e560fd"
      },
      iconCreateFunction: (cluster) => {
        return L.divIcon({
          html: `
          <div class="main-cluster-container">
            <div class="d-flex jusify-content-center align-items-center cluster-icon-container">
                <span>${cluster.getChildCount()}</span>
            </div>
          </div>
                  `,
          className: ""
        });
      }
    });
    cluster.addLayers(point.map(x => this.getMarker(x)));
    return cluster;
  }
}
