import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private mapType: MapType;

  private center: MapPoint;

  constructor() {
    this.mapType = 1;
    this.center = new MapPoint(50, 30);
   }

  ngOnInit() {
  }

}

export enum MapType{
  Google = 1,
  Yandex = 2
}

export class MapPoint{
  constructor(public lat: number, public lon: number){

  }
}
