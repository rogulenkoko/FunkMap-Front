import { Component, OnInit, Input } from '@angular/core';
import { Musician } from "app/main/musician/models";

@Component({
  selector: 'musician-info',
  templateUrl: './musician-info.component.html',
  styleUrls: ['./musician-info.component.scss']
})
export class MusicianInfoComponent implements OnInit {

  @Input() musician: Musician;

  constructor() { }

  ngOnInit() {
  }

}
