import { Component, OnInit, Input } from '@angular/core';
import { BaseModel } from "app/core";

@Component({
  selector: 'entity-video',
  templateUrl: './entity-video.component.html',
  styleUrls: ['./entity-video.component.scss']
})
export class EntityVideoComponent implements OnInit {

  @Input() entity: BaseModel;

  constructor() { }

  ngOnInit() {
    console.log(this.entity);
  }

}
