import { Injectable } from '@angular/core';
import { MapPoint } from "./models";

@Injectable()
export class MarkerFactory {

  constructor() {

  }

  public getMarker(point: MapPoint):L.Marker {
    point.iconUrl = "assets/images/markers/bass.png";
    var marker = L.marker(new L.LatLng(point.lat, point.lng), {
      icon: new L.Icon({
        iconUrl: point.iconUrl,
        className: "icon-image-container"
      })
    });
    return marker;
  }

  public getMarkerCluster(point: Array<MapPoint>): L.LayerGroup {
    
    var cluster = L.markerClusterGroup({});
    cluster.addLayers(point.map(x=>this.getMarker(x)));
    return cluster;
  }
}
