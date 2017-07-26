import { Component, OnInit, Input } from '@angular/core';
import { Musician } from "app/main/musician/models";
import { Marker, EntityType } from "app/main/map/models";

@Component({
  selector: 'musician-map',
  templateUrl: './musician-map.component.html',
  styleUrls: ['./musician-map.component.scss']
})
export class MusicianMapComponent implements OnInit {

  @Input() musician: Musician;

  private marker: Marker;

  constructor() { }

  ngOnInit() {
    var marker = new Marker(this.musician.login, this.musician.latitude, this.musician.longitude, EntityType.Musician);
    marker.instrument = this.musician.instrument;
    this.marker = marker;
  }

}
