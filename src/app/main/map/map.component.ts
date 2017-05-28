import { Component, OnInit } from '@angular/core';
import * as Leaflet from "leaflet";
import { MapProvider } from "./map-provider.service";

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private leafletMap: L.Map;

  constructor() { }

  ngOnInit() {
    var map = new L.Map('map', { center: new L.LatLng(67.6755, 33.936), zoom: 10, zoomAnimation: false });
    var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    map.addLayer(osm);
  }

}
