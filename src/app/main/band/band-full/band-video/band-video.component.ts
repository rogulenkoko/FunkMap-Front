import { Component, OnInit, Input } from '@angular/core';
import { Band } from "app/main/band/models";

@Component({
  selector: 'band-video',
  templateUrl: './band-video.component.html',
  styleUrls: ['./band-video.component.scss']
})
export class BandVideoComponent implements OnInit {

  @Input() band: Band;

  constructor() { }

  ngOnInit() {
  }

}
