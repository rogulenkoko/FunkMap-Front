import { Component, OnInit } from '@angular/core';
import { MapService } from "./map.service";
import { MapPoint, MapType, Marker } from "./models";

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private mapType: MapType;

  private center: MapPoint;

  private markers: Array<Marker>;

  constructor(private mapService: MapService) {
    this.mapType = 2;
    this.center = new MapPoint(50, 30);
   }

  ngOnInit() {
      this.getAll();
  }

  getAll(){
    this.mapService.getAll().subscribe(markers=>{
      this.markers = markers;
    })
  }

}


