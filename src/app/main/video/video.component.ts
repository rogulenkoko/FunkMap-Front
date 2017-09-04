import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  private videoLink: string;

  constructor() { }

  ngOnInit() {
  }

}
