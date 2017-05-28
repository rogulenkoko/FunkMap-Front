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
      console.log("asd");
      this.router.navigate(["/musician"]);
    })
    return marker;
  }

  public getMarkerCluster(point: Array<MapMarker>): L.LayerGroup {
    
    var cluster = L.markerClusterGroup({});
    cluster.addLayers(point.map(x=>this.getMarker(x)));
    return cluster;
  }
}
