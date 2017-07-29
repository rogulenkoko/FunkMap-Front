import { Component, OnInit, Input } from '@angular/core';
import { Musician } from "app/main/musician/models";

@Component({
  selector: 'musician-video',
  templateUrl: './musician-video.component.html',
  styleUrls: ['./musician-video.component.scss']
})
export class MusicianVideoComponent implements OnInit {

  @Input() musician: Musician;

  constructor() { }

  ngOnInit() {
  }

}
