import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { MapMarker } from "./models";

@Injectable()
export class MarkerFactory {

  constructor(private router: Router) {

  }

  public getMarker(point: MapMarker):L.Marker {
    point.iconUrl = "assets/images/markers/bass.png";
    var marker = L.marker(new L.LatLng(point.lat, point.lng), {
      icon: new L.Icon({
        iconUrl: point.iconUrl,
        className: "icon-image-container"
      })
    });
    marker.on("click",(marker)=>{
      this.router.navigate(["/musician"]);
    })
    return marker;
  }

  public getMarkerCluster(point: Array<MapMarker>): L.LayerGroup {
    
    var cluster = L.markerClusterGroup({
      polygonOptions: {
        opacity:0
      },
      iconCreateFunction: (cluster)=>{
        return L.divIcon({ 
          html:  `<div class="d-flex jusify-content-center align-items-center cluster-icon-container">
                    <div>${cluster.getChildCount()}</div>
                  </div>`,
                  className:""
        });
      }
    });
    cluster.addLayers(point.map(x=>this.getMarker(x)));
    return cluster;
  }
}
